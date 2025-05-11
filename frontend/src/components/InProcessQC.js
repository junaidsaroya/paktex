import {message} from 'antd';
import {useEffect, useState} from 'react';
import apiClient from '../utils/interceptor';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';

const InProcessQC = () => {
  const [inProcessQCList, setInProcessQCList] = useState([]);
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [loading, setLoading] = useState(false);
  const [testProduct, setTestProduct] = useState('');
  const [qcNumber, setQcNumber] = useState('');
  const [description, setDescription] = useState('');
  const [remarks, setRemarks] = useState('');
  const [releaseDate, setReleaseDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [tests, setTests] = useState([
    {
      testName: '',
      specifications: '',
      results: ['', '', '', '', ''],
      status: '',
    },
  ]);
  const updateTestField = (index, resultIndex, value) => {
    setTests((prevTests) => {
      const newTests = [...prevTests];
      const selectedTest = newTests[index];

      const results = selectedTest?.results
        ? [...selectedTest.results]
        : ['', '', '', '', ''];

      results[resultIndex] = String(value || '').trim();

      newTests[index] = {
        ...selectedTest,
        results,
        status: results.every(
          (result) => result === selectedTest?.acceptanceCriteria
        )
          ? 'Pass'
          : 'Fail',
      };

      const hasFail = newTests.some((test) => test.status === 'Fail');
      setRemarks(hasFail ? 'Fail' : 'Pass');

      return newTests;
    });
  };
  const handleCancel = () => {
    setSelectedProduct(null);
    setTestProduct(null);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response1 = await apiClient.get('/batch/getAllBatch');

        const activeBatch = response1.data.filter(
          (batch) => batch.status === true
        );

        const products = activeBatch;

        const response2 = await apiClient.get(
          '/batchRawMaterial/batchRawMaterial'
        );
        const productName =
          response2.data.data.length > 0
            ? response2.data.data[0].productName
            : '';

        const matchedProduct = products.find(
          (product) => product.productName === productName
        );
        setProducts(matchedProduct ? [matchedProduct] : []);
      } catch (error) {
        message.error('Failed to fetch products.');
      }
    };

    fetchProducts();
  }, []);
  const handleProductSelection = (event) => {
    const selectedValue = event.target.value;
    const selectedProductObj = products.find(
      (product) => product.productName === selectedValue
    );
    setSelectedProduct(selectedProductObj);
  };
  const handleSearch = async () => {
    if (!selectedProduct) {
      message.error('Please select product.');
      return;
    }

    setLoading(true);

    try {
      const response = await apiClient.get('/product/getAllProducts');
      const products = response.data.data || [];

      const selectedProductData = products.find(
        (product) => product.productName === selectedProduct.productName
      );

      const fetchedTests = selectedProductData?.tests || [];
      const validatedTests = fetchedTests.map((test) => ({
        ...test,
        results: test.results || ['', '', '', '', ''],
      }));

      setTests(validatedTests);
    } catch (error) {
      message.error('Failed to fetch products.');
    } finally {
      setLoading(false);
    }

    try {
      const response = await apiClient.get(
        '/intimateProduct/getAllIntimateProducts'
      );
      const products = response.data.data || [];

      const selectedProductData = products.find(
        (product) => product.productName === selectedProduct.productName
      );

      setProductName(selectedProductData?.productName || '');
      setTestProduct(selectedProductData || []);
    } catch (error) {
      message.error('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };
  const fetchInProcessQCList = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/inProcessQC/inProcessQC');
      const inProcessData = response.data.data || [];

      setInProcessQCList(inProcessData);

      generateQCNumber(inProcessData);
    } catch (error) {
      message.error('Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };
  const generateQCNumber = (inProcessDataList) => {
    const currentYear = new Date().getFullYear().toString().slice(-2);
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');

    let newQcNumber = `IP${currentYear}${currentMonth}0001`;

    if (inProcessDataList.length > 0) {
      const lastQcNumber =
        inProcessDataList[inProcessDataList.length - 1].qcNumber;
      const lastNumber = parseInt(lastQcNumber.slice(-4), 10) + 1;
      newQcNumber = `IP${currentYear}${currentMonth}${String(
        lastNumber
      ).padStart(4, '0')}`;
    }

    setQcNumber(newQcNumber);
  };
  useEffect(() => {
    fetchInProcessQCList();
  }, []);
  const handleSubmit = async () => {
    const payload = {
      productName,
      releaseDate,
      qcNumber,
      remarks,
      description,
      results: tests.map((test) => ({
        testName: test.testName,
        specifications: test.specifications,
        results: test.results,
        status: test.status || '',
      })),
      qcAnalyst: localStorage.getItem('userName'),
      batchNumber: selectedProduct?.batchNumber,
    };

    try {
      await apiClient.post('/inProcessQC/inProcessQC', payload);
      setReleaseDate('');
      setQcNumber('');
      setTests([]);
      setTestProduct('');
      setDescription('');
      setRemarks('');
      setSelectedProduct('');
      setProductName('');
      message.success('Test Saved successfully.');
      fetchInProcessQCList();
    } catch (error) {
      message.error('Failed to save test.');
    }
  };
  const handleViewReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    const pageWidth = doc.internal.pageSize.getWidth();
    const text = 'InProcessQC Report';
    const textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    doc.text(text, (pageWidth - textWidth) / 2, 20);

    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, 30);

    const headers = [
      ['Product', 'Batch Number', 'QC Number', 'QC Analyst', 'Remarks'],
    ];
    const data = inProcessQCList.map((ip) => [
      ip.productName || 'N/A',
      ip.batchNumber || 'N/A',
      ip.qcNumber || 'N/A',
      ip.qcAnalyst || 'N/A',
      ip.remarks || 'N/A',
    ]);

    autoTable(doc, {
      head: headers,
      body: data,
      startY: 35,
      styles: {
        fontSize: 10,
        cellPadding: 3,
        halign: 'center',
      },
      headStyles: {
        fillColor: [65, 184, 72],
        textColor: 255,
        fontStyle: 'bold',
      },
      columnStyles: {
        0: {halign: 'left'},
        1: {halign: 'center'},
        2: {halign: 'center'},
        3: {halign: 'center'},
        3: {halign: 'center'},
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const newWindow = window.open();
    if (newWindow) {
      newWindow.location.href = pdfUrl;
    } else {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.target = '_blank';
      link.download = 'InProcessQC_report.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  return (
    <div className="text-start">
      <div className="mb-4 flex justify-between">
        <div className="flex gap-2">
          <select
            required
            value={selectedProduct ? selectedProduct.productName : ''}
            onChange={handleProductSelection}
            className="block w-52 px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
          >
            <option value="" disabled>
              Select Product
            </option>
            {products.length > 0 ? (
              products.map((product) => (
                <option key={product._id} value={product.productName}>
                  {product.productName}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No Batch Available
              </option>
            )}
          </select>

          {selectedProduct && (
            <div className="block w-52 px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor">
              {selectedProduct?.batchNumber}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleViewReport}
            className="text-black border border-[#DCE3E3] px-3 py-1 rounded-md flex items-center gap-2"
          >
            <i className="fa-solid fa-eye text-lg"></i>
            <span>View Report</span>
          </button>
          <button
            type="submit"
            onClick={handleSearch}
            className="py-2 px-6 w-40 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm hover:bg-themeColor2"
          >
            Search
          </button>
        </div>
      </div>

      {testProduct && (
        <div className="p-2 border border-gray-300 rounded-md shadow-sm">
          <div className="w-full p-4 border border-gray-300 bg-gray-50 rounded-md shadow-sm mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Product Name:
                  </span>{' '}
                  {testProduct.productName}
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Relaese Date:
                  </span>{' '}
                  <input
                    type="date"
                    required
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    className="max-w-96 w-52 px-3 py-1 border-b border-gray-400 bg-transparent focus:outline-none focus:ring-themeColor focus:border-themeColor"
                  />
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Supplier Name:
                  </span>{' '}
                  {testProduct.supplierName}
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">QC#</span>{' '}
                  {qcNumber}
                </div>
              </div>

              <div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">Gr No:</span>{' '}
                  {testProduct.grNumber}
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">
                    Receive Date:
                  </span>{' '}
                  {
                    new Date(testProduct.receiveDate)
                      .toISOString()
                      .split('T')[0]
                  }
                </div>
                <div className="pb-2">
                  <span className="font-semibold text-gray-800">Lot No:</span>{' '}
                  {testProduct.lotNumber}
                </div>
              </div>
            </div>
          </div>

          <textarea
            type="date"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description/Note..."
            className="w-full p-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm mb-4"
          />

          <div className="relative mb-4">
            <div className="max-h-[500px] scrollbar-hide">
              <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-300">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 text-gray-600 font-semibold">
                    <tr>
                      <th className="px-4 py-3 border-b text-left text-gray-700 font-semibold">
                        Test Name
                      </th>
                      <th className="px-4 py-3 border-b text-left text-gray-700 font-semibold">
                        Specifications
                      </th>
                      <th className="px-4 py-3 border-b text-left text-gray-700 font-semibold">
                        Result 1
                      </th>
                      <th className="px-4 py-3 border-b text-left text-gray-700 font-semibold">
                        Result 2
                      </th>
                      <th className="px-4 py-3 border-b text-left text-gray-700 font-semibold">
                        Result 3
                      </th>
                      <th className="px-4 py-3 border-b text-left text-gray-700 font-semibold">
                        Result 4
                      </th>
                      <th className="px-4 py-3 border-b text-left text-gray-700 font-semibold">
                        Result 5
                      </th>
                      <th className="px-4 py-3 border-b text-left text-gray-700 font-semibold">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests &&
                      tests.map((test, index) => (
                        <tr key={index}>
                          <td className="px-2 py-2 border-b text-gray-800">
                            <input
                              type="text"
                              value={test.testName || ''}
                              readOnly
                              onChange={(e) =>
                                setTests((prevTests) => {
                                  const newTests = [...prevTests];
                                  newTests[index] = {
                                    ...newTests[index],
                                    testName: e.target.value,
                                  };
                                  return newTests;
                                })
                              }
                              className="border p-2 rounded-md"
                            />
                          </td>
                          <td className="px-2 py-2 border-b text-gray-800">
                            <input
                              type="text"
                              value={test.specifications || ''}
                              readOnly
                              onChange={(e) =>
                                setTests((prevTests) => {
                                  const newTests = [...prevTests];
                                  newTests[index] = {
                                    ...newTests[index],
                                    specifications: e.target.value,
                                  };
                                  return newTests;
                                })
                              }
                              className="border p-2 rounded-md"
                            />
                          </td>
                          {[0, 1, 2, 3, 4].map((resultIndex) => (
                            <td
                              key={resultIndex}
                              className="py-2 px-2 border-b"
                            >
                              <input
                                type="text"
                                value={test.results?.[resultIndex] || ''}
                                onChange={(e) =>
                                  updateTestField(
                                    index,
                                    resultIndex,
                                    e.target.value
                                  )
                                }
                                onBlur={(e) =>
                                  updateTestField(
                                    index,
                                    resultIndex,
                                    e.target.value
                                  )
                                }
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    updateTestField(
                                      index,
                                      resultIndex,
                                      e.target.value
                                    );
                                  }
                                }}
                                className="border p-2 rounded-md"
                              />
                            </td>
                          ))}
                          <td className="px-2 py-2 border-b text-gray-800">
                            {test.status}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Remarks:
              <div className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor">
                {remarks}
              </div>
            </label>
          </div>
          <div className="mb-4 flex justify-between">
            <label className="block text-gray-700 mb-2">
              QC Analyst Signature:
              <div className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor">
                {localStorage.getItem('userName')}
              </div>
            </label>
            <label className="block text-gray-700 mb-2">
              QC Manager Signature:
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-50 rounded-md shadow-sm focus:outline-none focus:ring-themeColor focus:border-themeColor"
              />
            </label>
          </div>
          <div className="mt-10 justify-center flex gap-2">
            <button
              type="submit"
              onClick={handleCancel}
              className="py-2 px-6 w-40 border text-gray-500 font-semibold rounded-md shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="py-2 px-6 w-40 bg-themeGradient hover:bg-themeGradientHover text-white font-semibold rounded-md shadow-sm"
            >
              SAVE
            </button>
          </div>
        </div>
      )}

      <div className="relative mt-4">
        <div className="max-h-[500px] scrollbar-hide">
          <div className="overflow-x-auto overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-200 text-gray-600 font-semibold border border-gray-200">
                <tr>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Batch Number</th>
                  <th className="py-3 px-4">QC Number</th>
                  <th className="py-3 px-4">QC Analyst</th>
                  <th className="py-3 px-4">Remarks</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : inProcessQCList.length > 0 ? (
                  inProcessQCList.map((inProcessQC) => (
                    <tr
                      key={inProcessQC._id}
                      className="hover:bg-gray-50 transition-colors text-center duration-200 border-t bg-white divide-y divide-gray-200 text-gray-600"
                    >
                      <td className="py-4 px-4">{inProcessQC.productName}</td>
                      <td className="py-4 px-4">{inProcessQC.batchNumber}</td>
                      <td className="py-4 px-4">{inProcessQC.qcNumber}</td>
                      <td className="py-4 px-4">{inProcessQC.qcAnalyst}</td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                            inProcessQC.remarks === 'Fail'
                              ? 'border-red-800 bg-red-100 text-red-800'
                              : 'border-green-800 bg-green-100 text-green-800'
                          }`}
                        >
                          {inProcessQC.remarks}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <i class="fa-regular fa-eye p-2 border border-gray-300 rounded-md hover:bg-white"></i>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
                      <div className="flex flex-col items-center justify-center my-10">
                        <i className="fa-solid fa-box-open text-gray-400 text-5xl"></i>
                        <p className="text-gray-400 mt-4">No data found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InProcessQC;

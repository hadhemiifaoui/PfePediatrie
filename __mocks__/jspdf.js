const jsPDF = jest.fn().mockImplementation(() => {
    return {
      save: jest.fn(),
      text: jest.fn(),
      addImage: jest.fn(),
    };
  });
  
  export default jsPDF;
  
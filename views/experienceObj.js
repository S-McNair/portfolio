
const experienceObj = {
    comapny     : 'Advanced Test Equipment',
    startDate   : 'February 2015',
    endDate     : 'November 2017',
    titles      : [
                   'Fiber Optics Calibration Technician II', 
                   'Fiber Optics Calibration Technician I'
                  ], //titles in descending order, index 0 = current title
    bulletPoints: [
                   'Promoted to Fiber Optics Calibration Technician II for consistent delivery of accurate, well-documented products',
                   'Ensured accurate measurement and full operational safety for a variety of fiber optics and electrical installation and test equipment'
                  ]
};
console.log(`expOBJ: ${JSON.stringify(experienceObj)}`);
export default experienceObj;
// const companyExperience = {
//     comapny     : 'Advanced Test Equipment',
//     startDate   : '',
//     endDate     : '',
//     titles      : ['', 
//                    ''], //titles in descending order, index 0 = current title
//     bulletPoints: ['',
//                    '',
//                    '']
// };

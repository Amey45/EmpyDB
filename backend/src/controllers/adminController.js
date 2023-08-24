const adminModel = require("../models/adminModel");
const employeeModel = require("../models/employeeModel");
const jwt = require("jsonwebtoken");

const jwtSecret = "hdkfbieq34893452dwsjbuylwkjdnqo";

module.exports.getAllCompanies = async (req, res) => {
  await adminModel
    .find({})
    .then((result) => {
      res.status(200).send({
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "error while getting companies",
        error,
      });
    });
};

module.exports.registerCompanyController = async (req, res) => {
  console.log("registration started");
  // Company_Name = req.body.Company_Name;
  // location = req.body.location;
  // password = req.body.password;
  // let adminModelData = new adminModel({ Company_Name, location, password });

  let body = req.body;
  let adminModelData = new adminModel(body);

  // const existingUser = await adminModel.findOne({
  //   Company_Name,
  // });
  // //existing user
  // if (existingUser) {
  //   return res.status(500).send("Company Already exists , login to continue");
  // }

  await adminModelData
    .save()
    .then(() => {
      console.log(adminModelData);
      res.send(adminModelData);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};

module.exports.loginCompanyController = async (req, res) => {
  try {
    const { Company_Name, password } = req.body;

    //validation
    if (!Company_Name || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid company name or password",
      });
    }

    //check admin
    const admin = await adminModel.findOne({ Company_Name });
    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "Company is not registered",
      });
    }

    if (password != admin.password) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({ _id: admin._id }, jwtSecret, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "logged in successfully",
      admin: {
        _id: admin._id,
        Company_Name: admin.Company_Name,
        location: admin.location,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

module.exports.updateCompanyInfo = async (req, res) => {
  updatedCompanyInfo = new adminModel();

  updatedCompanyInfo = req.body;

  await adminModel.findByIdAndUpdate(req.params.id, req.body).then(() => {
    res.status(200).send({
      success: true,
      message: "company info updated successfully",
      updatedCompanyInfo,
    });
  });
};

module.exports.deleteCompany = async (req, res) => {
  await adminModel.findByIdAndDelete(req.params.id).then(() => {
    res.status(200).send({
      success: true,
      message: "company deleted successfully",
    });
  });
};

module.exports.getAllEmployees = async (req, res) => {
  _compId = req.params.compId;
  await employeeModel
    .find({ _compId })
    .then((result) => {
      res.status(200).send({
        result,
      });
    })
    .catch((error) => {
      res.status(500).send({
        success: false,
        message: "error while getting employees",
        error,
      });
    });
};

// module.exports.getOneEmployee = async (req, res) => {

//   id = req.params.empId;

//   await employeeModel
//     .findById({ id })
//     .then((result) => {
//       res.status(200).send({
//         result,
//       });
//     })
//     .catch((error) => {
//       res.status(500).send({
//         success: false,
//         message: "error while getting employees",
//         error,
//       });
//     });
// };

module.exports.createEmployee = async (req, res) => {
  var employeeModelData = new employeeModel();

  employeeModelData.name = req.body.name;
  employeeModelData.email = req.body.email;
  employeeModelData.phone = req.body.phone;
  employeeModelData._compId = req.params.compId;

  const name = req.body.name;

  const existingUser = await employeeModel.findOne({
    name,
  });
  //existing user
  if (existingUser) {
    return res.status(500).send({
      success: false,
      message: "Employee Already Exists",
    });
  }

  await employeeModelData
    .save({})
    .then(() => {
      res.status(200).send({
        success: true,
        message: "Employee Added Successfully",
        employeeModelData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        success: false,
        message: "Error",
        err,
      });
    });
};

module.exports.updateEmployeeInfo = async (req, res) => {
  updatedEmployeeInfo = new employeeModel();

  updatedEmployeeInfo = req.body;

  await employeeModel.findByIdAndUpdate(req.params.empId, req.body).then(() => {
    res.status(200).send({
      success: true,
      message: "Employee info updated successfully",
      updatedEmployeeInfo,
    });
  });
};

module.exports.deleteEmployee = async (req, res) => {
  await employeeModel.findByIdAndDelete(req.params.empId).then(() => {
    res.status(200).send({
      success: true,
      message: "Employee deleted successfully",
    });
  });
};

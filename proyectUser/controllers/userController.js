const { Result } = require('express-validator');
const User = require('../models/userModel');
const ExcelJS = require('exceljs');

class {

    static async getAllUsers(req, res)
    {
       try{
            const users = await User.findAll();
            res.json(users);
       } catch (error)
       {
        res.status(500)
        .json({error: error.message})
       }
    }

    static async createUser(req, res)
    {
        try
        {
            const user = await User.create(req.body);
            res.status(201).json(user);
        }catch(error)
        {
            res.status(500).json({error: error.message});
        }
      
    }

    static async getUserById(req, res)
    {
        try{
            const user = await User.findById(req.params.id);
            if(!user)
            {
                return res.status(404).json({message: "User not found!"});
            }
            return res.json(user);
        }catch(error)
        {
            res.status(500).json({error: error.message});
        }
    }

    static async updateUser(req, res){
        
        try{
        const user = await User.update(req.params.id, req.body);
        if(!user)
        {
            return res.status(404).json({message: "User not found"})
        }
        return res.json(user);
        }catch(error){
            res.status(500).json({error: error.message});

        }
    }
    static async deleteUser(req, res)
    {
        try{
            const Result = await User.delete(req.params.id);
            res.json(Result);
        }catch(error)
        {
            res.status(500).json({error: error.message});
        }
    }
    static async downloadUsersExcel(req, res) {
        try {
            const users = await User.findAll();
    
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('users');
    
            worksheet.columns = [
                { header: 'Nombre', key: 'nombre', width: 30 },
                { header: 'Email', key: 'email', width: 15 },
            ];
    
            users.forEach(user => {
                worksheet.addRow(user);
            });
    
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
    
            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            console.error('Error generating Excel file:', error);
            res.status(500).send('Error generating Excel file');
        }
    }
    
    
}


    


module.exports = UserController;
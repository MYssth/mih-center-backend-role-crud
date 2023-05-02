require('dotenv').config();
var config = require('./dbconfig');
const sql = require('mssql');

async function getPersonnelData() {
    console.log("let getPersonnelData");
    const result = await fetch(`http://${process.env.backendHost}:${process.env.psnDataDistPort}/api/getpersonnel`)
        .then((response) => response.json())
        .then((data) => {
            console.log("getPersonnelData complete");
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    return result;
}

async function getFieldsData() {
    console.log("let getFieldsData");
    const result = await fetch(`http://${process.env.backendHost}:${process.env.psnDataDistPort}/api/getfields`)
        .then((response) => response.json())
        .then((data) => {
            console.log("getFieldsData complete");
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    return result;
}

async function getFactionsData() {
    console.log("let getFactionsData");
    const result = await fetch(`http://${process.env.backendHost}:${process.env.psnDataDistPort}/api/getfactions`)
        .then((response) => response.json())
        .then((data) => {
            console.log("getFactionsData complete");
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    return result;
}

async function getDepartmentsData() {
    console.log("let getDepartmentsData");
    const result = await fetch(`http://${process.env.backendHost}:${process.env.psnDataDistPort}/api/getdepartments`)
        .then((response) => response.json())
        .then((data) => {
            console.log("getDepartmentsData complete");
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    return result;
}

async function getPositionsData() {
    console.log("let getPositionsData");
    const result = await fetch(`http://${process.env.backendHost}:${process.env.psnDataDistPort}/api/getpositions`)
        .then((response) => response.json())
        .then((data) => {
            console.log("getPositionsData complete");
            return data;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    return result;
}

async function addField(field) {
    try {

        console.log("addField call try connect to server, field name = " + field.field_name);
        let pool = await sql.connect(config);
        console.log("connect complete");
        await pool.request()
            .input('field_name', sql.VarChar, field.field_name)
            .input('hims_id', sql.VarChar, field.hims_id)
            .query("INSERT INTO personnel_fields (field_name, field_isactive, hims_id) VALUES (@field_name, 1, @hims_id)");
        console.log("addField complete");
        console.log("====================");
        return { "status": "ok" };
    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function addFaction(faction) {
    try {

        console.log("addFaction call try connect to server, faction name = " + faction.faction_name + " field id = " + faction.field_id);
        let pool = await sql.connect(config);
        console.log("connect complete");
        await pool.request()
            .input('faction_name', sql.VarChar, faction.faction_name)
            .input('field_id', sql.Int, faction.field_id)
            .input('hims_id', sql.VarChar, faction.hims_id)
            .query("INSERT INTO personnel_factions (faction_name, faction_isactive, field_id, hims_id) VALUES (@faction_name, 1, @field_id, @hims_id)");
        console.log("addFaction complete");
        console.log("====================");
        return { "status": "ok" };

    }
    catch (error) {
        console.log(error);
        return { "status": "error", "message": error.message };
    }
}

async function addDepartment(department) {
    try {

        console.log("addDepartment call try connect to server, department name = " + department.department_name + " facion id = " + department.faction_id);
        let pool = await sql.connect(config);
        console.log("connect complete");
        await pool.request()
            .input('department_name', sql.VarChar, department.department_name)
            .input('faction_id', sql.Int, department.faction_id)
            .input('hims_id', sql.VarChar, department.hims_id)
            .query("INSERT INTO personnel_departments (department_name, department_isactive, faction_id, hims_id) VALUES (@department_name, 1, @faction_id, @hims_id)");
        console.log("addDepartment complete");
        console.log("====================");
        return { "status": "ok" };

    }
    catch (error) {
        console.log(error);
        return { "status": "error", "message": error.message };
    }
}

async function addPosition(position) {
    try {

        console.log("addPosition call try connect to server, position name = " + position.position_name + " department id = " + position.department_id);
        let pool = await sql.connect(config);
        console.log("connect complete");
        await pool.request()
            .input('position_name', sql.VarChar, position.position_name)
            .input('department_id', sql.Int, position.department_id)
            .input('hims_id', sql.VarChar, position.hims_id)
            .query("INSERT INTO personnel_positions (position_name, position_isactive, department_id, hims_id) VALUES (@position_name, 1, @department_id, @hims_id)");
        console.log("addPosition complete");
        console.log("====================");
        return { "status": "ok" };

    }
    catch (error) {
        console.log(error);
        return { "status": "error", "message": error.message };
    }
}

async function updateField(field) {
    try {

        console.log("updateField call try connect to server, field id = " + field.field_id + " new field name = " + field.field_name);
        let pool = await sql.connect(config);
        console.log("connect complete");
        await pool.request()
            .input('field_id', sql.Int, field.field_id)
            .input('field_name', sql.VarChar, field.field_name)
            .input('hims_id', sql.VarChar, field.hims_id)
            .query("UPDATE personnel_fields SET field_name = @field_name, hims_id = @hims_id WHERE field_id = @field_id");
        console.log("updateField complete");
        console.log("====================");
        return { "status": "ok" };

    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function updateFaction(faction) {
    try {

        console.log("updateFaction call try connect to server, faction id = " + faction.faction_id + " new faction name = " + faction.faction_name + " new field id = " + faction.field_id);
        let pool = await sql.connect(config);
        console.log("connect complete");
        await pool.request()
            .input('faction_id', sql.Int, faction.faction_id)
            .input('faction_name', sql.VarChar, faction.faction_name)
            .input('field_id', sql.Int, faction.field_id)
            .input('hims_id', sql.VarChar, faction.hims_id)
            .query("UPDATE personnel_factions SET faction_name = @faction_name, field_id = @field_id, hims_id = @hims_id WHERE faction_id = @faction_id");
        console.log("updatefaction complete");
        console.log("====================");
        return { "status": "ok" };

    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function updateDepartment(department) {
    try {

        console.log("updatedepartment call try connect to server, department id = " + department.department_id + " new department name = " + department.department_name + " new faction id = " + department.faction_id);
        let pool = await sql.connect(config);
        console.log("connect complete");
        let result = await pool.request()
            .input('department_id', sql.Int, department.department_id)
            .input('department_name', sql.VarChar, department.department_name)
            .input('faction_id', sql.Int, department.faction_id)
            .input('hims_id', sql.VarChar, department.hims_id)
            .query("UPDATE personnel_departments SET department_name = @department_name, faction_id = @faction_id, hims_id = @hims_id WHERE department_id = @department_id");
        console.log("updatedepartment complete");
        console.log("====================");
        return { "status": "ok" };

    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function updatePosition(position) {
    try {

        console.log("updateposition call try connect to server, position id = " + position.position_id + " new position name = " + position.position_name + " new department id = " + position.department_id);
        let pool = await sql.connect(config);
        console.log("connect complete");
        let result = await pool.request()
            .input('position_id', sql.Int, position.position_id)
            .input('position_name', sql.VarChar, position.position_name)
            .input('department_id', sql.Int, position.department_id)
            .input('hims_id', sql.VarChar, position.hims_id)
            .query("UPDATE personnel_positions SET position_name = @position_name, department_id = @department_id, hims_id = @hims_id WHERE position_id = @position_id");
        console.log("updateposition complete");
        console.log("====================");
        return { "status": "ok" };

    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function setFieldActivate(field) {
    try {

        console.log("setFieldActivate call try connect to server, field id = " + field.field_id + " isactive = " + field.field_isactive);
        let pool = await sql.connect(config);
        console.log("connect complete");

        if (field.field_isactive === "0") {
            console.log("field id:" + field.field_id + " -> set to deactive");
            let isDetect = false;

            console.log("check is any personnel use this field");
            const psnData = await getPersonnelData();
            for (let i = 0; i < psnData.length; i++) {
                if (psnData[i].field_id == field.field_id && psnData[i].personnel_isactive == 1) {
                    console.log("personnel detect, cannot deactive field id: " + field.field_id);
                    isDetect = true;
                    break;
                }
            }

            console.log("check is any factions use this field");
            const factionsData = await getFactionsData();
            for (let i = 0; i < factionsData.length; i++) {
                if (factionsData[i].field_id == field.field_id && factionsData[i].faction_isactive == 1) {
                    console.log("faction detect, cannot deactive field id: " + field.field_id);
                    isDetect = true;
                    break;
                }
            }

            if (isDetect === false) {
                let result = await pool.request()
                    .input('field_id', sql.Int, field.field_id)
                    .query("UPDATE personnel_fields SET field_isactive = 0 WHERE field_id = @field_id");
                console.log("setFieldActivate complete");
                console.log("====================");
                return { "status": "ok" };
            }
            console.log("setFieldActivate complete");
            console.log("====================");
            return { "status": "refuse", "message": "ไม่สามารถ Deactive ได้เนื่องจากมีผู้ใช้หรือฝ่ายอื่นๆใช้งานอยู่" };
        }
        else {
            console.log("field id:" + field.field_id + " -> set to active");
            let result = await pool.request()
                .input('field_id', sql.Int, field.field_id)
                .query("UPDATE personnel_fields SET field_isactive = 1 WHERE field_id = @field_id");
            console.log("setFieldActivate complete");
            console.log("====================");
            return { "status": "ok" };
        }

    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function setFactionActivate(faction) {
    try {

        console.log("setFactionActivate call try connect to server, faction id = " + faction.faction_id + " isactive = " + faction.faction_isactive);
        const pool = await sql.connect(config);
        console.log("connect complete");
        let isDetect = false;

        if (faction.faction_isactive === "0") {
            console.log("faction id:" + faction.faction_id + " -> set to deactive");

            console.log("check is any personnel use this faction");
            const psnData = await getPersonnelData();
            for (let i = 0; i < psnData.length; i++) {
                if (psnData[i].faction_id == faction.faction_id && psnData[i].personnel_isactive == 1) {
                    console.log("personnel detect, cannot deactive faction id: " + faction.faction_id);
                    isDetect = true;
                    break;
                }
            }

            console.log("check is any departments use this faction");
            const departmentsData = await getDepartmentsData();
            for (let i = 0; i < departmentsData.length; i++) {
                if (departmentsData[i].faction_id == faction.faction_id && departmentsData[i].department_isactive == 1) {
                    console.log("department detect, cannot deactive faction id: " + faction.faction_id);
                    isDetect = true;
                    break;
                }
            }

            if (isDetect === false) {
                let result = await pool.request()
                    .input('faction_id', sql.Int, faction.faction_id)
                    .query("UPDATE personnel_factions SET faction_isactive = 0 WHERE faction_id = @faction_id");
                console.log("setFactionActivate complete");
                console.log("====================");
                return { "status": "ok" };
            }
            console.log("setFactionActivate complete");
            console.log("====================");
            return { "status": "refuse", "message": "ไม่สามารถ Deactive ได้เนื่องจากมีผู้ใช้หรือฝ่ายอื่นๆใช้งานอยู่" };
        }
        else {
            console.log("check field active status");
            const fieldsData = await getFieldsData();
            for (let i = 0; i < fieldsData.length; i++) {
                if (fieldsData[i].field_id == faction.field_id && fieldsData[i].field_isactive == 0) {
                    console.log("field deactive detect, cannot active faction id: " + faction.faction_id);
                    isDetect = true;
                    break;
                }
            }

            if (isDetect === false) {
                let result = await pool.request()
                    .input('faction_id', sql.Int, faction.faction_id)
                    .query("UPDATE personnel_factions SET faction_isactive = 1 WHERE faction_id = @faction_id");
                console.log("setFactionActivate complete");
                console.log("====================");
                return { "status": "ok" };
            }
            console.log("setFactionActivate complete");
            console.log("====================");
            return { "status": "refuse", "message": "ไม่สามารถ Active ได้เนื่องจากสายงาน Deactive อยู่" };
        }

    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function setDepartmentActivate(department) {
    try {

        console.log("setDepartmentActivate call try connect to server, department id = " + department.department_id + " isactive = " + department.department_isactive);
        const pool = await sql.connect(config);
        console.log("connect complete");
        let isDetect = false;

        if (department.department_isactive === "0") {
            console.log("department id:" + department.department_id + " -> set to deactive");

            console.log("check is any personnel use this department");
            const psnData = await getPersonnelData();
            for (let i = 0; i < psnData.length; i++) {
                if (psnData[i].department_id == department.department_id && psnData[i].personnel_isactive == 1) {
                    console.log("personnel detect, cannot deactive department id: " + department.department_id);
                    isDetect = true;
                    break;
                }
            }

            console.log("check is any positions use this department");
            const positionsData = await getPositionsData();
            for (let i = 0; i < positionsData.length; i++) {
                if (positionsData[i].department_id == department.department_id && positionsData[i].position_isactive == 1) {
                    console.log("position detect, cannot deactive department id: " + department.department_id);
                    isDetect = true;
                    break;
                }
            }

            if (isDetect === false) {
                let result = await pool.request()
                    .input('department_id', sql.Int, department.department_id)
                    .query("UPDATE personnel_departments SET department_isactive = 0 WHERE department_id = @department_id");
                console.log("setDepartmentActivate complete");
                console.log("====================");
                return { "status": "ok" };
            }
            console.log("setDepartmentActivate complete");
            console.log("====================");
            return { "status": "refuse", "message": "ไม่สามารถ Deactive ได้เนื่องจากมีผู้ใช้หรือฝ่ายอื่นๆใช้งานอยู่" };
        }
        else {
            console.log("check faction active status");
            const factionsData = await getFactionsData();
            for (let i = 0; i < factionsData.length; i++) {
                if (factionsData[i].faction_id == department.faction_id && factionsData[i].faction_isactive == 0) {
                    console.log("faction deactive detect, cannot active department id: " + department.department_id);
                    isDetect = true;
                    break;
                }
            }

            if (isDetect === false) {
                let result = await pool.request()
                    .input('department_id', sql.Int, department.department_id)
                    .query("UPDATE personnel_departments SET department_isactive = 1 WHERE department_id = @department_id");
                console.log("setDepartmentActivate complete");
                console.log("====================");
                return { "status": "ok" };
            }

            console.log("setDepartmentActivate complete");
            console.log("====================");
            return { "status": "refuse", "message": "ไม่สามารถ Active ได้เนื่องจากฝ่าย Deactive อยู่" };
        }

    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function setPositionActivate(position) {
    try {

        console.log("setPositionActivate call try connect to server, position id = " + position.position_id + " isactive = " + position.position_isactive);
        const pool = await sql.connect(config);
        console.log("connect complete");
        let isDetect = false;

        if (position.position_isactive === "0") {
            console.log("position id:" + position.position_id + " -> set to deactive");

            console.log("check is any personnel use this position");
            const psnData = await getPersonnelData();
            for (let i = 0; i < psnData.length; i++) {
                if (psnData[i].position_id == position.position_id && psnData[i].personnel_isactive == 1) {
                    console.log("personnel detect, cannot deactive position id: " + position.position_id);
                    isDetect = true;
                    break;
                }
            }

            if (isDetect === false) {
                let result = await pool.request()
                    .input('position_id', sql.Int, position.position_id)
                    .query("UPDATE personnel_positions SET position_isactive = 0 WHERE position_id = @position_id");
                console.log("setPositionActivate complete");
                console.log("====================");
                return { "status": "ok" };
            }
            console.log("setPositionActivate complete");
            console.log("====================");
            return { "status": "refuse", "message": "ไม่สามารถ Deactive ได้เนื่องจากมีผู้ใช้ใช้งานอยู่" };
        }
        else {
            console.log("check department active status");
            const departmentsData = await getDepartmentsData();
            for (let i = 0; i < departmentsData.length; i++) {
                if (departmentsData[i].department_id == position.department_id && departmentsData[i].department_isactive == 0) {
                    console.log("department deactive detect, cannot active position id: " + position.position_id);
                    isDetect = true;
                    break;
                }
            }

            if (isDetect === false) {
                let result = await pool.request()
                    .input('position_id', sql.Int, position.position_id)
                    .query("UPDATE personnel_positions SET position_isactive = 1 WHERE position_id = @position_id");
                console.log("setPositionActivate complete");
                console.log("====================");
                return { "status": "ok" };
            }

            console.log("setPositionActivate complete");
            console.log("====================");
            return { "status": "refuse", "message": "ไม่สามารถ Active ได้เนื่องจากแผนก Deactive อยู่" };
        }

    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function deleteField(field_id) {
    try {
        console.log("delete field call try connect to server, field id = " + field_id);
        const pool = await sql.connect(config);
        console.log("connect complete");

        console.log("check is any personnel use this field");
        const psnData = await getPersonnelData();
        for (let i = 0; i < psnData.length; i++) {
            if (psnData[i].field_id == field_id) {
                console.log("personnel detect, cannot delete field id: " + field_id);
                console.log("deleteField complete");
                console.log("====================");
                return { "status": "refuse", "message": "ไม่สามารถลบได้เนื่องจากมีผู้ใช้สายงานนี้อยู่" };
            }
        }

        console.log("check is any factions use this field");
        const factionsData = await getFactionsData();
        for (let i = 0; i < factionsData.length; i++) {
            if (factionsData[i].field_id == field_id) {
                console.log("faction detect, cannot delete field id: " + field_id);
                console.log("deleteField complete");
                console.log("====================");
                return { "status": "refuse", "message": "ไม่สามารถลบได้เนื่องจากมีฝ่ายใช้สายงานนี้อยู่" };
            }
        }

        console.log("check is field deactive?");
        const fieldsData = await getFieldsData();
        for (let i = 0; i < fieldsData.length; i++) {
            if (fieldsData[i].field_id == field_id) {
                if (fieldsData[i].field_isactive == 0) {
                    let result = await pool.request()
                        .input('field_id', sql.Int, field_id)
                        .query("DELETE FROM personnel_fields WHERE field_id = @field_id");
                    console.log("deleteField complete");
                    console.log("====================");
                    return { "status": "ok" };
                }
                else {
                    console.log("field isactive status = " + fieldsData[i].field_isactive + " cannot delete this field");
                    console.log("deleteField complete");
                    console.log("====================");
                    return { "status": "refuse", "message": "ไม่สามารถลบได้เนื่องจากสายงาน active อยู่" };
                }
            }
        }

    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function deleteFaction(faction_id) {
    try {
        console.log("delete faction call try connect to server, faction id = " + faction_id);
        const pool = await sql.connect(config);
        console.log("connect complete");

        console.log("check is any personnel use this faction");
        const psnData = await getPersonnelData();
        for (let i = 0; i < psnData.length; i++) {
            if (psnData[i].faction_id == faction_id) {
                console.log("personnel detect, cannot delete faction id: " + faction_id);
                console.log("deleteFaction complete");
                console.log("====================");
                return { "status": "refuse", "message": "ไม่สามารถลบได้เนื่องจากมีผู้ใช้ฝ่ายนี้อยู่" };
            }
        }

        console.log("check is any departments use this faction");
        const departmentsData = await getDepartmentsData();
        for (let i = 0; i < departmentsData.length; i++) {
            if (departmentsData[i].faction_id == faction_id) {
                console.log("department detect, cannot delete faction id: " + faction_id);
                console.log("deleteFaction complete");
                console.log("====================");
                return { "status": "refuse", "message": "ไม่สามารถลบได้เนื่องจากมีแผนกใช้ฝ่ายนี้อยู่" };
            }
        }

        console.log("check is faction deactive?");
        const factionsData = await getFactionsData();
        for (let i = 0; i < factionsData.length; i++) {
            if (factionsData[i].faction_id == faction_id) {
                if (factionsData[i].faction_isactive == 0) {
                    let result = await pool.request()
                        .input('faction_id', sql.Int, faction_id)
                        .query("DELETE FROM personnel_factions WHERE faction_id = @faction_id");
                    console.log("deleteFaction complete");
                    console.log("====================");
                    return { "status": "ok" };
                }
                else {
                    console.log("faction isactive status = " + factionsData[i].faction_isactive + " cannot delete this faction");
                    console.log("deleteFaction complete");
                    console.log("====================");
                    return { "status": "refuse", "message": "ไม่สามารถลบได้เนื่องจากฝ่าย active อยู่" };
                }
            }
        }

    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function deleteDepartment(department_id) {
    try {
        console.log("delete department call try connect to server, department id = " + department_id);
        const pool = await sql.connect(config);
        console.log("connect complete");

        console.log("check is any personnel use this department");
        const psnData = await getPersonnelData();
        for (let i = 0; i < psnData.length; i++) {
            if (psnData[i].department_id == department_id) {
                console.log("personnel detect, cannot delete department id: " + department_id);
                console.log("deleteDepartment complete");
                console.log("====================");
                return { "status": "refuse", "message": "ไม่สามารถลบได้เนื่องจากมีผู้ใช้แผนกนี้อยู่" };
            }
        }

        console.log("check is any positions use this department");
        const positionsData = await getPositionsData();
        for (let i = 0; i < positionsData.length; i++) {
            if (positionsData[i].department_id == department_id) {
                console.log("position detect, cannot delete department id: " + department_id);
                console.log("deleteDepartment complete");
                console.log("====================");
                return { "status": "refuse", "message": "ไม่สามารถลบได้เนื่องจากมีตำแหน่งใช้แผนกนี้อยู่" };
            }
        }

        console.log("check is department deactive?");
        const departmentsData = await getDepartmentsData();
        for (let i = 0; i < departmentsData.length; i++) {
            if (departmentsData[i].department_id == department_id) {
                if (departmentsData[i].department_isactive == 0) {
                    let result = await pool.request()
                        .input('department_id', sql.Int, department_id)
                        .query("DELETE FROM personnel_departments WHERE department_id = @department_id");
                    console.log("deleteDepartment complete");
                    console.log("====================");
                    return { "status": "ok" };
                }
                else {
                    console.log("department isactive status = " + departmentsData[i].department_isactive + " cannot delete this department");
                    console.log("deleteDepartment complete");
                    console.log("====================");
                    return { "status": "refuse", "message": "ไม่สามารถลบได้เนื่องจากแผนก active อยู่" };
                }
            }
        }

    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function deletePosition(position_id) {
    try {
        console.log("delete position call try connect to server, position id = " + position_id);
        const pool = await sql.connect(config);
        console.log("connect complete");

        console.log("check is any personnel use this position");
        const psnData = await getPersonnelData();
        for (let i = 0; i < psnData.length; i++) {
            if (psnData[i].position_id == position_id) {
                console.log("personnel detect, cannot delete position id: " + position_id);
                console.log("deletePosition complete");
                console.log("====================");
                return { "status": "refuse", "message": "ไม่สามารถลบได้เนื่องจากมีผู้ใช้ตำแหน่งนี้อยู่" };
            }
        }

        console.log("check is position deactive?");
        const positionsData = await getPositionsData();
        for (let i = 0; i < positionsData.length; i++) {
            if (positionsData[i].position_id == position_id) {
                if (positionsData[i].position_isactive == 0) {
                    let result = await pool.request()
                        .input('position_id', sql.Int, position_id)
                        .query("DELETE FROM personnel_positions WHERE position_id = @position_id");
                    console.log("deletePosition complete");
                    console.log("====================");
                    return { "status": "ok" };
                }
                else {
                    console.log("position isactive status = " + positionsData[i].position_isactive + " cannot delete this position");
                    console.log("deletePosition complete");
                    console.log("====================");
                    return { "status": "refuse", "message": "ไม่สามารถลบได้เนื่องจากตำแหน่ง active อยู่" };
                }
            }
        }

    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function getSiteSetting() {
    try {
        console.log("getSiteSetting call try connect to server");
        const pool = await sql.connect(config);
        console.log("connect complete");
        let result = await pool.request().query("SELECT * FROM hospital_setting");
        const jsonData = {
            fname: result.recordset[0].fname,
            sname: result.recordset[0].sname,
            logo: Buffer.from(result.recordset[0].logo).toString(),
        }
        console.log("getSiteSetting complete");
        console.log("====================");
        return jsonData;
    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

async function updateSiteSetting(hospital_setting) {
    try {
        console.log("updateSiteSetting call try connect to server");
        const pool = await sql.connect(config);
        console.log("connect complete");
        await pool.request()
            .input("fname", sql.VarChar, hospital_setting.fname)
            .input("sname", sql.VarChar, hospital_setting.sname)
            .input("logo", sql.VarBinary, Buffer.from(hospital_setting.logo))
            .query("UPDATE hospital_setting SET fname = @fname, sname = @sname, logo = @logo");
        console.log("updateSiteSetting complete");
        console.log("====================");
        return { "status": "ok" };
    }
    catch (error) {
        console.error(error);
        return { "status": "error", "message": error.message };
    }
}

module.exports = {
    addField: addField,
    addFaction: addFaction,
    addDepartment: addDepartment,
    addPosition: addPosition,
    updateField: updateField,
    updateFaction: updateFaction,
    updateDepartment: updateDepartment,
    updatePosition: updatePosition,
    setFieldActivate: setFieldActivate,
    setFactionActivate: setFactionActivate,
    setDepartmentActivate: setDepartmentActivate,
    setPositionActivate: setPositionActivate,
    deleteField: deleteField,
    deleteFaction: deleteFaction,
    deleteDepartment: deleteDepartment,
    deletePosition: deletePosition,
    getSiteSetting: getSiteSetting,
    updateSiteSetting: updateSiteSetting,
}
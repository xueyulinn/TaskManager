import exceljs from "exceljs";
import Task from "../models/Task.js";
const exportTasksReport = async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "username email");
    const workbook = new exceljs.Workbook();
    const sheet = workbook.addWorksheet("Tasks Report");
    worksheet.columns = [
      { header: "Task ID", key: "_id", width: 25 },
      { header: "Title", key: "title", width: 30 },
      { header: "Description", key: "description", width: 50 },
      { header: "Priority", key: "priority", width: 15 },
      { header: "Status", key: "status", width: 20 },
      { header: "Due Date", key: "dueDate", width: 20 },
      { header: "Assigned To", key: "assignedTo", width: 30 },
    ];

    tasks.forEach((task) => {
      task.assignedTo
        .map((item) => `${item.username} (${item.email})`)
        .join(", ");
      sheet.addRow({
        _id: task.id,
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate,
        assignedTo: task.assignedTo || "Unassigned",
      });
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="tasks_report.xlsx"'
    );

    return workbook.xlsx.write(res).then(() => {
      res.end();
    });
  } catch (error) {
    res.json({
      message: "Error while exporting reports",
      error: error.message,
    });
  }
};

const exportUsersReport = async (req, res) => {
  try {
  } catch (error) {
    res.json({
      message: "Error while exporting reports",
      error: error.message,
    });
  }
};

export { exportTasksReport, exportUsersReport };

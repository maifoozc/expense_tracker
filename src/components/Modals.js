import React, { useEffect, useState } from "react";
import { Modal, TextField, Button, Select, MenuItem, Snackbar, Slide, SnackbarContent } from "@mui/material";

const IncomeModal = ({ open, onClose, setUserData }) => {
  const [amount, setAmount] = useState(null);

  const handleAddBalance = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
      setUserData(prevData => ({ ...prevData, income: prevData.income + parsedAmount }));
      onClose();
    } else {
      alert("Please enter a valid amount for income.");
    }
    onClose();
  };


  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.77)", }}
    >
      <div
        style={{
          backgroundColor: "rgba(217, 217, 217, 1)", padding: "0 0 20px 20px", width: "538px", height: "164px", borderRadius: "20px", justifyContent: "center", alignItems: "center",
        }}
      >
        <h3 style={{ fontWeight: "700", fontSize: "30px", padding: 0 }}>
          Add Balance
        </h3>
        <TextField
          size="small"
          variant="outlined"
          placeholder="Income Amount"
          onChange={(e) => setAmount(e.target.value)}
          sx={{
            borderRadius: "15px",
            backgroundColor: "rgba(251, 251, 251, 1)",
            overflow: "hidden",
          }}
        />
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: "400",
            fontSize: "16px",
            color: "#000",
            borderBottom: "1px solid red",
            backgroundColor: "rgba(217, 217, 217, 1)",
            borderRadius: "10px",
            margin: "0 1rem 0 1rem",
            ":hover": {
              backgroundColor: "rgba(244, 187, 74, 1)",
              color: "#fff",
            },
          }}
          onClick={handleAddBalance}
        >
          Add Balance
        </Button>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            fontWeight: "400",
            fontSize: "16px",
            color: "#000",
            borderBottom: "1px solid red",
            backgroundColor: "rgba(217, 217, 217, 1)",
            borderRadius: "10px",
            ":hover": {
              backgroundColor: "rgba(244, 187, 74, 1)",
              color: "#fff",
            },
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

const ExpenseModal = ({ open, onClose, setUserData, editExpense, userData }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    if (editExpense) {
      setTitle(editExpense.title);
      setAmount(editExpense.amount.toString());
      setCategory(editExpense.category);
      setDate(editExpense.date);
    } else {
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate("");
    }
  }, [editExpense]);
  const handleSubtractBalance = () => {
    if (!title.trim() || !amount || !date) {
      setSnackbarMessage("Please fill in all fields.");
      setSnackbarOpen(true);
      return;
    }

    const parsedAmount = parseFloat(amount);
    const parsedDate = new Date(date).toISOString().slice(0, 10);

    if (isNaN(parsedAmount) || parsedAmount <= 0 || !parsedDate) {
      setSnackbarMessage("Please enter valid data for the expense.");
      setSnackbarOpen(true);
      return;
    }

    if (parsedAmount > userData.income) {
      setSnackbarMessage("You do not have sufficient Wallet Balance.");
      setSnackbarOpen(true);
      return;
    }

    const newExpense = {
      title: title.trim(),
      amount: parsedAmount,
      category: category,
      date: parsedDate,
    };

    if (editExpense) {
      const updatedExpenses = userData.expenses.map(expense =>
        expense.title === editExpense.title && expense.date === editExpense.date ? newExpense : expense
      );

      setUserData(prevData => ({
        ...prevData,
        expenses: updatedExpenses,
        income: prevData.income - parsedAmount + editExpense.amount,
      }));
    } else {
      setUserData(prevData => ({
        ...prevData,
        expenses: [...prevData.expenses, newExpense],
        income: prevData.income - parsedAmount,
      })
      );
    }

    onClose();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Modal
      open={open} onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255, 255, 255, 0.77)", }}
    >
      <div
        style={{ backgroundColor: "rgba(217, 217, 217, 1)", padding: "0 0 20px 20px", width: "538px", height: "auto", borderRadius: "20px", }}
      >
        <h3>{editExpense ? "Edit Expense" : "Add Expense"}</h3>
        <div>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", }}>

            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}
              style={{ width: "14rem", height: "1rem", padding: "1rem", borderRadius: "10px", margin: "0.1rem 0.1rem 1rem 0.1rem", backgroundColor: "rgba(251, 251, 251, 1)", border: "none", outline: "none", boxShadow: "0 0 14px 0 rgba(0, 0, 0, 0.25)" }}
            />
            <input type="number" placeholder="Price" value={amount} onChange={(e) => setAmount(e.target.value)}
              style={{ width: "14rem", height: "1rem", padding: "1rem", borderRadius: "10px", margin: "0.1rem 0.1rem 1rem 0.1rem", backgroundColor: "rgba(251, 251, 251, 1)", border: "none", outline: "none", boxShadow: "0 0 14px 0 rgba(0, 0, 0, 0.25)" }}
            />

          </div>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", }}>
            <Select
              placeholder="Select Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ width: "16rem", height: "3.3rem", padding: "1rem", backgroundColor: "rgba(251, 251, 251, 1)", color: "#000", borderRadius: "15px", borderBottom: "3px solid #b9b9b9", borderLeft: "1px solid #b9b9b9", }}
            >
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Travel">Travel</MenuItem>
            </Select>

            <input type="date" placeholder="Title" value={date} onChange={(e) => setDate(e.target.value)}
              style={{ width: "14rem", height: "1rem", padding: "1rem", borderRadius: "10px", margin: "0.1rem 0.1rem 1rem 0.1rem", backgroundColor: "rgba(251, 251, 251, 1)", border: "none", outline: "none", boxShadow: "0 0 14px 0 rgba(0, 0, 0, 0.25)" }}
            />

          </div>
          <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", }} >
            <Button
              variant="contained"
              sx={{ width: "14rem", textTransform: "none", fontWeight: "400", fontSize: "16px", color: "#000", borderBottom: "1px solid red", backgroundColor: "rgba(217, 217, 217, 1)", borderRadius: "10px", ":hover": { backgroundColor: "rgba(244, 187, 74, 1)", color: "#fff", }, }}
              onClick={handleSubtractBalance}
            >
              {editExpense ? "Confirm Editing" : "Add Expense"}
            </Button>
            <Button
              variant="contained"
              sx={{ width: "14rem", textTransform: "none", fontWeight: "400", fontSize: "16px", color: "#000", borderBottom: "1px solid red", backgroundColor: "rgba(217, 217, 217, 1)", borderRadius: "10px", ":hover": { backgroundColor: "rgba(244, 187, 74, 1)", color: "#fff", }, }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          TransitionComponent={Slide}
        >
          <SnackbarContent
            sx={{
              backgroundColor: '#4caf50 ',
              color: '#ffffff' ,
              display:"flex",
              justifyContent:"center"
            }}
            message={snackbarMessage}
          /></Snackbar>
      </div>
    </Modal>
  );
};

export { IncomeModal, ExpenseModal };

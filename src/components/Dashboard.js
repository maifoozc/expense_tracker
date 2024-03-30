    import './Dashboard.css';
    import { Button, IconButton, Typography } from "@mui/material";
    import Card from "@mui/material/Card";
    import Piechart from "./Piechart";
    import { useEffect, useState } from "react";
    import { ExpenseModal, IncomeModal } from "./Modals";
    import LocalDiningIcon from "@mui/icons-material/LocalDining";
    import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
    import FlightIcon from "@mui/icons-material/Flight";
    import HighlightOffIcon from '@mui/icons-material/HighlightOff';
    import ModeIcon from '@mui/icons-material/Mode';
    import Barchart from "./Barchart";
    import ArrowLeftAltIcon from '@mui/icons-material/KeyboardBackspace';
    import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

    const Dashboard = () => {
        // Modals useStates
        const [openIncome, setOpenIncome] = useState(false);

        const handleOpenIncomeModal = () => {
            setOpenIncome(true);
        };

        const handleCloseIncomeModal = () => {
            setOpenIncome(false);
        };

        const [openExpense, setOpenExpense] = useState(false);

        const handleOpenExpenseModal = (index) => {
            if (index !== undefined) {
                setEditExpenseIndex(index);
            } else {
                setEditExpenseIndex(null);
            }
            setOpenExpense(true);
        };

        const handleCloseExpenseModal = () => {
            setOpenExpense(false);
        };


        const [userData, setUserData] = useState(() => {
            const savedData = localStorage.getItem("userData");
            return savedData ? JSON.parse(savedData) : {
                income: 5000,
                expenses: [],
            };
        });

        useEffect(() => {
            localStorage.setItem("userData", JSON.stringify(userData));
        }, [userData]);

        const expenseCategoryIcons = {
            Food: <LocalDiningIcon sx={{ borderRadius: "50%", backgroundColor: "rgba(217, 217, 217, 1)", padding: "0.1rem" }} />,
            Entertainment: <SportsEsportsIcon sx={{ borderRadius: "50%", backgroundColor: "rgba(217, 217, 217, 1)", padding: "0.1rem" }} />,
            Travel: <FlightIcon sx={{ borderRadius: "50%", backgroundColor: "rgba(217, 217, 217, 1)", padding: "0.1rem" }} />
        };

        // Pagination
        const [currentPage, setCurrentPage] = useState(1);
        const rowsPerPage = 3;

        const handlePageChange = (newPage) => {
            setCurrentPage(newPage);
        };

        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = Math.min(startIndex + rowsPerPage, userData.expenses.length);


        const handleDeleteExpense = (index) => {
            const updatedExpenses = [...userData.expenses];
            updatedExpenses.splice(index, 1);
            setUserData({ ...userData, expenses: updatedExpenses });
        };

        const [editExpenseIndex, setEditExpenseIndex] = useState(null);
        const handleEditExpense = (index) => {
            setEditExpenseIndex(index);
            setOpenExpense(true);
        };

        return (
            <div className="dashboard_container">
            <Typography style={{color:"#fff",fontSize:"28px",fontWeight:"700", lineHeight:"32.17px", marginBottom: "0.5rem",marginTop:"0.5rem"}}>Expense Tracker</Typography>
        
                    <div className='top_section'
                        style={{ backgroundColor: "#626262", display: "flex", justifyContent: "space-evenly", alignItems: "center", padding: "10px", borderRadius: "15px", margin:"0 1rem"}}
                    >
                        <Card
                            className="income_card"
                            sx={{ width: "355.41px", height: "181px", backgroundColor: "#9b9b9b", color: "#fff", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", }}
                        >
                            <Typography sx={{ fontSize: "30px", fontWeight: "400", lineHeight: "34.47px", paddingBottom: "20px", }}>
                                Wallet Balance:{" "}
                                <span style={{ color: "rgba(157, 255, 91, 1)", fontWeight: "700" }}>
                                    &#x20B9; {userData.income}
                                </span>
                            </Typography>
                            <Button
                                sx={{ width: "80%", color: "#fff", backgroundColor: "rgba(181, 220, 82, 1)", borderRadius: "15px", ":hover": { backgroundColor: "rgba(181, 220, 82, 1)" }, }}
                                onClick={handleOpenIncomeModal}
                            >
                                + Add Income
                            </Button>
                        </Card>

                        <Card
                            className="expense_card"
                            sx={{ width: "355.41px", height: "181px", backgroundColor: "#9b9b9b", color: "#fff", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", }}
                        >
                            <Typography sx={{ fontSize: "30px", fontWeight: "400", lineHeight: "34.47px", paddingBottom: "20px", }}>
                                Expense:{" "}
                                <span style={{ color: "rgba(157, 255, 91, 1)", fontWeight: "700" }}>
                                    &#x20B9; {userData.expenses.reduce((total, expense) => total + expense.amount, 0)}
                                </span>
                            </Typography>
                            <Button
                                sx={{ width: "80%", color: "#fff", backgroundColor: "rgba(255, 149, 149, 1)", borderRadius: "15px", ":hover": { backgroundColor: "rgba(255, 149, 149, 1)" }, }}
                                onClick={handleOpenExpenseModal}
                            >
                                + Add Expense
                            </Button>
                        </Card>
                        <div style={{width:"10rem"}}><Piechart userData={userData.expenses}/></div>
                        
                    </div>

                    <IncomeModal
                        open={openIncome}
                        onClose={handleCloseIncomeModal}
                        setUserData={setUserData}
                    />
                    <ExpenseModal
                        open={openExpense}
                        onClose={handleCloseExpenseModal}
                        userData= {userData}
                        setUserData={setUserData}
                        editExpense={editExpenseIndex !== null ? userData.expenses[editExpenseIndex] : null}

                    />
            
                <div className='bottom_section' style={{ width: "100%", justifyContent: "space-between", alignContent: "center", margin: "0.5rem 0 0 0" }}>
                    <div className="recent-transactions" style={{ width: "100%", height: "auto", }}>
                        <h3 style={{ color: '#fff', fontWeight: "700", fontSize: "28px", lineHeight: "32.17px", marginBottom: "0.5rem", marginTop: "0.8rem" }}>Recent transactions</h3>
                        <Card>
                            {userData.expenses.slice(startIndex, endIndex).map((e, index) => (
                                <div>
                                    <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "90%", margin: "1rem" }}>
                                        <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                                            {expenseCategoryIcons[e.category]}
                                            <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", marginLeft: "1rem" }} >
                                                <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>{e.title}</Typography>
                                                <Typography sx={{ fontSize: "16px", fontWeight: "400" }}>{e.date}</Typography>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", }}>
                                            <div style={{ color: "rgba(244, 187, 74, 1)", fontSize: "16px", fontWeight: "700", justifyContent: "left", display: "flex" }}>&#x20B9;{e.amount}</div>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                <div><IconButton sx={{ color: "#fff", backgroundColor: "rgba(255, 62, 62, 1)", borderRadius: "10px", margin: "0.5rem", "&:hover": { backgroundColor: "rgba(255, 62, 62, 1)" } }} onClick={() => handleDeleteExpense(index)}><HighlightOffIcon /></IconButton>
                                                </div>
                                                <div>
                                                    <IconButton sx={{ color: "#fff", backgroundColor: "rgba(244, 187, 74, 1)", borderRadius: "10px", "&:hover": { backgroundColor: "rgba(244, 187, 74, 1)" } }} onClick={() => handleEditExpense(index)}><ModeIcon /></IconButton>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr style={{ width: "96%", border: "1px solid rgba(155, 155, 155, 1)" }} />
                                </div>
                            ))}
                            <div style={{ display: "flex", justifyContent: 'center', margin: "1.2rem 0" }}>
                                <IconButton sx={{ backgroundColor: "rgba(241, 241, 241, 1)", "&:hover": { backgroundColor: "rgba(241, 241, 241, 1)" } }}
                                    onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}
                                ><ArrowLeftAltIcon /></IconButton>
                                <Button sx={{ color: '#fff', backgroundColor: "rgba(67, 150, 123, 1)", margin: '0 1rem', width: "37px", "&:hover": { backgroundColor: "rgba(67, 150, 123, 1)" } }}>{currentPage}</Button>
                                <IconButton sx={{ backgroundColor: "rgba(241, 241, 241, 1)", "&:hover": { backgroundColor: "rgba(241, 241, 241, 1)" } }}
                                    onClick={() => handlePageChange(currentPage + 1)} disabled={endIndex >= userData.expenses.length}
                                ><ArrowRightAltIcon /></IconButton>
                            </div>
                        </Card>

                    </div>
                    <div className="top-expenses" style={{  marginLeft: '1rem', height: "auto" }}>
                        <h3 style={{ color: '#fff', fontWeight: "700", fontSize: "28px", lineHeight: "32.17px", marginBottom: "0.5rem", marginTop: "0.8rem" }}>Top Expenses</h3>
                        <div>
                            <Card>
                                <div style={{height:"20rem"}}>
                                    <Barchart userData={userData} />
                                </div>
                            </Card>

                        </div>
                    </div>
                </div>
            </div>
        );
    };

    export default Dashboard;

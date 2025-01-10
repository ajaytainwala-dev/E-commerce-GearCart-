"use client";

import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
// import { useFetch } from "../hooks/useFetch";

interface User {
  _id: number;
  name: string;
  email: string;
//   role: string;
}

export default function UserList() {
    const fetchUsers = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/admin/users",
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            const data: User[] = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching users:", error);
            return [];
        }
    };

    const [users, setUsers] = React.useState<User[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<Error | null>(null);

    React.useEffect(() => {
        const getUsers = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        getUsers();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">Error: {error.message}</Typography>;
    }

    return (
        <div style={{ padding: "20px",marginTop:"5rem" }}>

            <Typography variant="h4" gutterBottom>
                Users
            </Typography>
            {users && users.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                {/* <TableCell>Role</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user._id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    {/* <TableCell>{user.role}</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                <Typography>No users found.</Typography>
            )}
        </div>
    );
}

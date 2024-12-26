"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import {
    Container,
    Typography,
    Box,
    Avatar,
    Button,
    TextField,
    Grid,
    Paper,
    Snackbar,
    Alert,
} from "@mui/material";
import {
    Edit as EditIcon,
    Save as SaveIcon,
    Cancel as CancelIcon,
} from "@mui/icons-material";

export interface IUser {
    name: string;
    email: string;
    password: string;
    mobile: string;
    address: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
    };
    googleId?: string;
    facebookId?: string;
    isAdmin: boolean;
}

// Mock user data (replace with actual data fetching in a real application)
const initialUserData: IUser = {
    name: "Profile Name",
    email: "name@example.com",
    password: "",
    mobile: "1234567890",
    address: {
        street: "123 Main St",
        city: "City",
        state: "State",
        postalCode: "12345",
        country: "Country",
    },
    isAdmin: false,
};

export default function ProfilePage() {
    const [userData, setUserData] = useState<IUser>(initialUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<IUser>(initialUserData);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success" as "success" | "error",
    });

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData(userData);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData(userData);
    };

    const handleSave = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setSnackbar({
                open: true,
                message: "You must be logged in to save changes.",
                severity: "error",
            });
            return;
        }

        fetch("http://127.0.0.1:5000/auth/", {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(editedData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update profile.");
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data);
                setIsEditing(false);
                setSnackbar({
                    open: true,
                    message: "Profile updated successfully!",
                    severity: "success",
                });
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                setSnackbar({
                    open: true,
                    message: "Failed to update profile.",
                    severity: "error",
                });
            });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedData((prev) => ({
            ...prev,
            address: { ...prev.address, [name]: value },
        }));
    };

    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
            fetch("http://127.0.0.1:5000/auth/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setUserData(data);
                    setEditedData(data);
                })
                .catch((error) => {
                    console.error("Error fetching user data:", error);
                });
        }
    }, []);

    return (
        <>
            <Suspense>
                {isLoggedIn ? (
                    <Container maxWidth="md" className="py-8">
                        <Typography
                            className="text-center text-2xl"
                            sx={{ fontSize: "2rem" }}
                        >
                            User Profile
                        </Typography>
                        <Paper elevation={3} className="p-6">
                            <Box className="flex flex-col items-center mb-6">
                                <Avatar
                                    alt={userData.name}
                                    src="/placeholder.svg"
                                    sx={{ width: 120, height: 120, mb: 2 }}
                                />
                                <Typography variant="h4" component="h1" gutterBottom>
                                    {userData.name}
                                </Typography>
                                <Typography
                                    variant="subtitle1"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    {/* {userData.role.toUpperCase()} */}
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                {isEditing ? (
                                    <>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                fullWidth
                                                label="Name"
                                                name="name"
                                                value={editedData.name}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                fullWidth
                                                label="Email"
                                                name="email"
                                                value={editedData.email}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                fullWidth
                                                label="Mobile"
                                                name="mobile"
                                                value={editedData.mobile}
                                                onChange={handleChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                fullWidth
                                                label="Street"
                                                name="street"
                                                value={editedData.address.street}
                                                onChange={handleAddressChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="City"
                                                name="city"
                                                value={editedData.address.city}
                                                onChange={handleAddressChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="State"
                                                name="state"
                                                value={editedData.address.state}
                                                onChange={handleAddressChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Postal Code"
                                                name="postalCode"
                                                value={editedData.address.postalCode}
                                                onChange={handleAddressChange}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Country"
                                                name="country"
                                                value={editedData.address.country}
                                                onChange={handleAddressChange}
                                            />
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid item xs={12} sm={12}>
                                            <Typography variant="body1" className="text-center">
                                                <strong>Email:</strong> {userData.email}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <Typography variant="body1" className="text-center">
                                                <strong>Mobile:</strong> {userData.mobile}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <Typography variant="body1" className="text-center">
                                                <strong>Address:</strong> {`${userData.address.street}, ${userData.address.city}, ${userData.address.state}, ${userData.address.postalCode}, ${userData.address.country}`}
                                            </Typography>
                                        </Grid>
                                    </>
                                )}
                            </Grid>

                            <Box className="mt-6 flex justify-center">
                                {isEditing ? (
                                    <>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<SaveIcon />}
                                            onClick={handleSave}
                                            className="mr-4"
                                        >
                                            Save Changes
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            startIcon={<CancelIcon />}
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<EditIcon />}
                                        onClick={handleEdit}
                                    >
                                        Edit Profile
                                    </Button>
                                )}
                            </Box>
                        </Paper>

                        <Snackbar
                            open={snackbar.open}
                            autoHideDuration={6000}
                            onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
                        >
                            <Alert
                                onClose={() =>
                                    setSnackbar((prev) => ({ ...prev, open: false }))
                                }
                                severity={snackbar.severity}
                                sx={{ width: "100%" }}
                            >
                                {snackbar.message}
                            </Alert>
                        </Snackbar>
                    </Container>
                ) : (
                    <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                        <div className="text-center lg:w-2/3 w-full">
                            <Typography variant="h2" component="h1" gutterBottom>
                                Please log in to view your profile
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => router.push("/login")}
                            >
                                Log In
                            </Button>
                        </div>
                    </div>
                )}
            </Suspense>
        </>
    );
}

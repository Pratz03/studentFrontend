import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useState, useEffect } from 'react';

export default function Student() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [students, setStudents] = useState([])

    const handleClick = (e) => {
        e.preventDefault();
        const student = { name, address }
        console.log(">>", student);
        fetch("http://localhost:8080/student/add", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(student)
        }).then(() => {
            console.log("----New student added----",);
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/student/getall").then((res) => res.json()).then((result) => {
            setStudents(result)
        })
    }, [])

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <h3>Add Student</h3>
            <TextField id="standard-basic" label="Name" variant="standard" value={name} onChange={(e) => { setName(e.target.value) }} />
            <TextField id="standard-basic" label="Address" variant="standard" value={address} onChange={(e) => { setAddress(e.target.value) }} />
            <Button variant='contained' onClick={(e) => handleClick(e)}>Submit</Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow
                                key={student.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {student.id}
                                </TableCell>
                                <TableCell align="right">{student.name}</TableCell>
                                <TableCell align="right">{student.address}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

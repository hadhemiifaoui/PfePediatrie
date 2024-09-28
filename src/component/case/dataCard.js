import React from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const DataCard = ({ title, columns, data, onAdd }) => (
    <Card>
        <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
                {title}
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => (
                            <TableCell key={index}>{column}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {columns.map((column, colIndex) => (
                                <TableCell key={colIndex}>{row[column.toLowerCase()]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
                variant="contained"
                color="primary"
                onClick={onAdd}
                startIcon={<AddIcon />}
                style={{ marginTop: '10px' }}
            >
                Add New
            </Button>
        </CardContent>
    </Card>
);

export default DataCard;

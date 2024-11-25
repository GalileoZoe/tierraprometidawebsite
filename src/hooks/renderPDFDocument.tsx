import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Student } from '../interfaces/Students';

// Función que crea el documento PDF con la información del estudiante
const renderPDFDocument = (student: Student) => (
    <Document>
        <Page size='A4' style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Expediente del Estudiante</Text>
                <Text>Nombre: {student.name}</Text>
                <Text>Apellidos: {student.lastname}</Text>
                <Text>Correo: {student.email}</Text>
                <Text>Contacto: {student.phone}</Text>
            </View>
        </Page>
    </Document>
);

// Estilos para el PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
});

export default renderPDFDocument;

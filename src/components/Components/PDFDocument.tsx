import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { Student } from '../../interfaces/Students';

interface PDFDocumentProps {
    student: Student;
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
        backgroundColor: '#f4f4f4',
        fontSize: 11,
    },
    header: {
        fontSize: 26,
        marginBottom: 15,
        textAlign: 'center',
        color: '#2c3e50',
        fontWeight: 'bold',
        borderBottom: '2px solid #db1313',
        paddingBottom: 8,
    },
    section: {
        marginBottom: 10,
        padding: 8,
        backgroundColor: '#ecf0f1',
        borderRadius: 5,
    },
    title: {
        fontSize: 13,
        marginBottom: 3,
        fontWeight: 'bold',
        color: '#34495e',
    },
    nsections: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    text: {
        fontSize: 11,
        color: '#7f8c8d',
    },
    paragraph: {
        fontSize: 11,
        marginTop: 5,
        color: '#2c3e50',
    },
    sections: {
        padding: 10,
        backgroundColor: '#db1313',
        color: 'white',
        borderRadius: 5,
        textAlign: 'center',
        marginBottom: 10,
    },
    contactText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    logo: {
        width: 200,
        height: 30,
        marginBottom: 15,
        alignSelf: 'center',
    },
});

export const PDFDocument: React.FC<PDFDocumentProps> = ({ student }) => (
    <Document>
        <Page size='LETTER' style={styles.page}>
            <Image style={styles.logo} src={require('../../assets/logo-09.png')} />
            <Text style={styles.header}>{`${student.name} ${student.lastname}`}</Text>
            <View style={styles.nsections}>
                <Text style={styles.text}>Fecha de Ingreso: {student.startdate}</Text>
                <Text style={styles.text}>Fecha de Salida: {student.enddate}</Text>
            </View>

            <View style={styles.sections}>
                <Text style={styles.contactText}>Usuario{student.phone}</Text>
            </View>
            <View style={styles.nsections}>
                <View style={styles.section}>
                    <Text style={styles.text}> {student.name}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}>{student.lastname}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.text}> Edad: {student.age} años</Text>
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Curp: {student.curp}</Text>
            </View>

            <View style={styles.sections}>
                <Text style={styles.contactText}>Contacto</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Teléfono: {student.address}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Correo: {student.email}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Dirección: {student.address}</Text>
            </View>

            <View style={styles.sections}>
                <Text style={styles.contactText}>Expediente</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.text}>Estado: {student.status}</Text>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>Descripción:</Text>
                <Text style={styles.text}>{student.description}</Text>
            </View>
        </Page>
    </Document>
);

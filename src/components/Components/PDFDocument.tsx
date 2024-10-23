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
    center: {
        textAlign: 'center',
    },
    header: {
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
        color: '#2c3e50',
        fontWeight: 'bold',
        borderBottom: '2px solid #db1313',
        paddingBottom: 8,
    },
    headers: {
        fontSize: 11,
        textAlign: 'center',
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
    titles: {
        fontSize: 11,
        marginBottom: 3,
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
    texts: {
        fontSize: 9,
        color: '#7f8c8d',
    },
    paragraphs: {
        fontSize: 11,
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
    signature: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingBottom: 25,
        width: 'auto'
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
    logos: {
        width: 120,
        height: 15,
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
                <Text style={styles.contactText}>Usuario {student.number}</Text>
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

        <Page size='LETTER' style={styles.page} >
            <View>
                <br />
                <View style={styles.center}>
                    <Text style={styles.headers} >CENTRO DE REHABILITACIÓN </Text>
                    <Image style={styles.logos} src={require('../../assets/logo-09.png')} />
                    <Text style={styles.texts} >Colonia Álvaro Obregón, Lerma, México, 52010. {'\n'}
                        Calle Guadalupe Victoria #34</Text>
                </View>
                <Text style={styles.header} >HOJA DE INFORMACION Y CONSENTIMIENTO</Text>
                <br />
                <Text style={styles.headers} >A LA FAMILIA DEL USUARIO Y AL CENTRO DE REHABILITACIÓN PARA INCIAR EL PROCESO DE {'\n'} DESINTOXICACIÓN,  REHABILITACIÓN Y REINSECCIÓN SOCIAL</Text>
                <br />
                <Text style={styles.paragraphs} >LO SIGUIENTE, ANTES DE LA FIRMA RESPONSIVA. {'\n'}
                    {'\n'}
                    1.FIRMA RESPONSIVA DEL RESPONSABLE (PADRE, MADRE, ESPOSO(A), HIJO Y/O HIJA). {'\n'}
                    {'\n'}
                    -UNA COPIA DE IDENTIFICACIÓN OFICIAL VIGENTE.{'\n'}
                    -FOTOGRAFÍA, DIRECCIÓN Y NÚMERO TELEFÓNICO PARA DAR INFORMACIÓN DEL USUARIO.{'\n'}
                    {'\n'}
                    2.VALORACIÓN DEL USUARIO SOBRE SU ESTADO DE SALUD (FÍSICO Y MENTAL) Y QUE USTED NOS PROPORCIONE DATOS ANTECEDENTES TALES COMO:{'\n'}
                    {'\n'}
                    -CONVULSIONES, ATAQUES, DELIRIOS, HEMORRAGIAS, DAÑOS MENTALES IRREVERSIBLES.Y OTRAS  {'\n'}
                    ENFERMEDADES FÍSICAS O MENTALES QUE PADEZCA EL USUARIO. {'\n'}
                    -ANTERIORES ANEXOS Y/O ALBERGUES.{'\n'}
                    -TRATAMIENTO MÉDICO O INTERNO A CENTROS PSIQUÍATRICOS.{'\n'}
                    -INGRESOS A RECLUSORIOS.  {'\n'}
                    {'\n'}
                    DE SER NECESARIO SE SOLICITARAN LOS SERVICIOS MEDICOS Y SE TRASLADARA AL USUARIO A SU ATENCION MEDICA, LOS GASTOS DE ELLO Y LOS HONORARIOS CORRERAN A CUENTA DEL RESPONSABLE.{'\n'}
                    {'\n'}
                    3.POR ALTA POBLACION EN EL CENTRO DE REHABILITACION, ESTADO DE SALUD Y/O CONDUCTA EL USUARIO SERA CANALIZADO A OTRA AGRUPACION O CENTRO DE REHABILITACION CON LAS MISMAS POLITICAS INTERNAS DE TRABAJO DE ESTE ESTABLECIMIENTO.{'\n'}
                    {'\n'}
                    -RESPETO A LA INTEGRIDAD HUMANA (FISICA MENTAL Y EMOCIONAL.){'\n'}
                    {'\n'}
                    A LA BREVEDAD POSIBLE SE LE INFORMARA AL RESPONSABLE DEL USUARIO DEL ESTABLECIMIENTO: NOMBRE, DIRECCION Y TELEFONO PARA PODER VISITAR AL USUARIO.{'\n'}
                    {'\n'}
                    4.NO PODRA SER INTERRUMPIDO EL TRATAMIENTO DEL USUARIO ANTEPONIENDO JUSTIFICACIONES COMO: {'\n'}
                    {'\n'}
                    -RESPONSABILIDAD FAMILIAR. {'\n'}
                    -TRABAJO.  {'\n'}
                    -ESTUDIO. {'\n'}
                    -HERENCIAS. {'\n'}
                    -FIRMA DE DOCUMENTOS.{'\n'}
                    -PROBLEMAS PENALES Y/O CIVILES. {'\n'}
                    -ENFERMEDADES Y DEFUNCIONES (NO COMPROBABLES).{'\n'}
                    {'\n'}
                    5.LA VISITA DEL USUARIO ES A LOS DOS MESES SIN EXCEPCION UNICAMENTE DOMINGOS EN UN HORARIO DE 3:00 PM. A 5:00 PM.{'\n'}
                    {'\n'}
                    6.EL RESPONSABLE DEL USUARIO SE COMPROMETE A CUMPLIR CON LOS REQUISITOS SOLICITADOS (ARTICULOS DE HIGIENE PERSONAL, PRODUCTOS DE LIMPIEZA, MEDICAMENTOS, DESPENSA Y PAPELERIA) PARA USO PERSONAL DEL USUARIO Y DEL ESTABLECIMIENTO. {'\n'}
                    {'\n'}
                </Text>

            </View>

        </Page>

        <Page size='LETTER' style={styles.page} >

            <View style={styles.center}>
                <Text style={styles.headers} >CENTRO DE REHABILITACIÓN </Text>
                <Image style={styles.logos} src={require('../../assets/logo-09.png')} />
                <Text style={styles.texts} >Colonia Álvaro Obregón, Lerma, México, 52010. {'\n'}
                    Calle Guadalupe Victoria #34</Text>
                <Text style={styles.header} >LISTA DE REQUISITOS</Text>
            </View>
            <Text style={styles.headers}>
                {'\n'}
                LA LISTA DE REQUISITOS SE LE ENTREGA EN RECEPCION.{'\n'}
                {'\n'}
            </Text>
            <Text style={styles.paragraphs} >
                7.LOS DAÑOS CAUSADOS AL INMUEBLE Y MOBILIARIO DE ESTE CENTRO DE REHABILITACION “TIERRA PROMETIDA”, POR PARTE DEL USUARIO, SERAN REPARADOS Y/O PAGADOS EN SU TOTALIDAD POR EL RESPONSABLE DEL USUARIO.{'\n'}
                {'\n'}
                8.EN CASO DE ROBO O FUGA QUE INVOLUCRE A MENORES DE EDAD SE EJERCERA ACCION PENAL SIN EXCEPCION DE PERSONA O FAMILIA.{'\n'}
                {'\n'}
                9.QUE DE NINGUNA MANERA SE TRAERA AL USUARIO ARTICULOS COMO: CADENAS, PULSERAS, ARETES, RELOJES, CARTERAS, DESODORANTES CON ALCOHOL NI EN AEROSOL, LOCIONES, CREMA PARA AFEITAR,NI MATERIALES PUNSOCORTANTESCON EL FIN DE ELABORAR ARTESANIAS O MANUALIDADES.{'\n'}
                {'\n'}
                10.ESTAMOS EN UN CENTRO DE REHABILITACION 24 HORAS PARA EL TRATAMIENTO DE ADICCIONES. RESPONSABLE DEL INTERNAMIENTOCENTRO DE REHABILITACIONEN SU PROCESO Y ESTANCIA.TIERRA PROMETIDA 24HRS.
                {'\n'}
                {'\n'}
            </Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: '30px' }}>
                <View style={styles.signature}>
                    <Text style={styles.paragraph}>
                        RESPONSABLE {'\n'}
                        DEL INTERNAMIENTO {'\n'}
                        EN SU PROCESO Y ESTANCIA.
                    </Text>
                </View>
                <View style={styles.signature}>
                    <Text style={styles.paragraph}>
                        CENTRO DE REHABILITACION {'\n'}
                        TIERRA PROMETIDA 24HRS.
                    </Text>
                </View>
            </View>
        </Page>
    </Document>


);


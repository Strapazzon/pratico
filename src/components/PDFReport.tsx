import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

type PDFReportProps = {
  data: {
    title: string;
  }; // Defina o tipo de dados adequado para o seu relatório
};

export const PDFReport = ({}: PDFReportProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Relatório</Text>
        {/* Adicione mais conteúdo ao relatório com base nos dados fornecidos */}
      </View>
    </Page>
  </Document>
);

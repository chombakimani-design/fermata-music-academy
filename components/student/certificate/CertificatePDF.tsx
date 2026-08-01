import {
    Document,
    Page,
    Text,
    View,
    StyleSheet
} from "@react-pdf/renderer";


const styles = StyleSheet.create({

    page:{
        padding:60,
        textAlign:"center"
    },

    title:{
        fontSize:28,
        marginBottom:40
    },

    name:{
        fontSize:24,
        marginBottom:25
    },

    text:{
        fontSize:16,
        marginBottom:20
    }

});


export default function CertificatePDF({

    name,

    course

}:{
    name:string;
    course:string;
}){


    return (

        <Document>

            <Page

                size="A4"

                style={styles.page}

            >

                <View>

                    <Text style={styles.title}>

                        Certificate of Completion

                    </Text>

                    <Text style={styles.text}>

                        This certificate is proudly presented to

                    </Text>

                    <Text style={styles.name}>

                        {name}

                    </Text>

                    <Text style={styles.text}>

                        For successfully completing

                    </Text>

                    <Text style={styles.name}>

                        {course}

                    </Text>

                    <Text style={styles.text}>

                        Fermata Music Academy

                    </Text>

                </View>

            </Page>

        </Document>

    );

}

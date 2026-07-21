import Image from "next/image";


export default function Logo({

    width = 180,
    height = 80,

}: {

    width?: number;
    height?: number;

}) {


    return (

        <Image

            src="/images/fermata-logo.png"

            alt="Fermata Music Academy"

            width={width}

            height={height}

            style={{

                width:"auto",

                height:"auto",

            }}

            priority

        />

    );

}

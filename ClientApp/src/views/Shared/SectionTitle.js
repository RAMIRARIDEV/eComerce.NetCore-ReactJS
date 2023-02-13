import { CardHeader } from "reactstrap"


const SectionTitle = ({text}) =>{

    return (
    <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>
        {text}
    </CardHeader>
    );
}

export default SectionTitle;
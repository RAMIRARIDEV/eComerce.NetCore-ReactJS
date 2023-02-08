import { CardHeader } from "reactstrap"


const Title = ({text}) =>{

    return (
    <CardHeader style={{ backgroundColor: '#4e73df', color: "white" }}>
        {text}
    </CardHeader>
    );
}

export default Title;


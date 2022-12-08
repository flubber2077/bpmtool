import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Scorecard(props) {
    function formatAsPercent(decimal) {
        return Math.floor(decimal * 100) + "%";
    }
    let total = props.on + props.high + props.low;
    let percentage = formatAsPercent(props.on / total);
    return (
        <Container>
            <h1>scorecard</h1>
            <Row>
                <Col>Over: {props.high}</Col>
                <Col>Under: {props.low}</Col>
                <Col>On: {props.on}</Col>
            </Row>
            <Row>
                <Col>Ratio: {percentage}</Col>
            </Row>
        </Container>
    )
}
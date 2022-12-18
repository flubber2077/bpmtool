import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Scorecard(props) {
    const formatAsPercent = decimal => Math.floor(decimal * 100) + "%";
    let total = props.on + props.high + props.low;
    let percentage = formatAsPercent(props.on / total);
    return (
        <div className="scorecard">
            <h2>scorecard</h2>
            <Row>
                <Col><p>Over: {props.high}</p></Col>
                <Col><p>Ratio: {percentage}</p></Col>
            </Row>
            <Row>
                <Col><p>On: {props.on}</p></Col>
                <Col><p>Total Tries: {total}</p></Col>
            </Row>
            <Row>
                <Col><p>Under: {props.low}</p></Col>
                <Col></Col>
            </Row>
        </div>
    )
}
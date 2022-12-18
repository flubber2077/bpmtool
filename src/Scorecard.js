import Container from "react-bootstrap/Container"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Scorecard(props) {
    let [low, on, high] = props.score;
    const formatAsPercent = decimal => Math.floor(decimal * 100) + "%";
    let total = on + high + low;
    let percentage = formatAsPercent(on / total);
    return (
        <div className="scorecard">
            <h2>scorecard</h2>
            <Row>
                <Col><p>Over: {high}</p></Col>
                <Col><p>Ratio: {percentage}</p></Col>
            </Row>
            <Row>
                <Col><p>On: {on}</p></Col>
                <Col><p>Total Tries: {total}</p></Col>
            </Row>
            <Row>
                <Col><p>Under: {low}</p></Col>
                <Col></Col>
            </Row>
        </div>
    )
}
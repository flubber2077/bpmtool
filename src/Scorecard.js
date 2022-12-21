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
                <Col className="px-0 text-end"><p>Over: </p></Col>
                <Col className="px-0 text-start"><p> {high}</p></Col>
                <Col className="px-0 text-end"><p>Ratio: </p></Col>
                <Col className="px-0 text-start"><p> {percentage}</p></Col>
            </Row>
            <Row>
                <Col className="px-0 text-end"><p>On:</p></Col>
                <Col className="px-0 text-start"><p>{on}</p></Col>
                <Col className="px-0 text-end"><p>Attempts:</p></Col>
                <Col className="px-0 text-start"><p>{total}</p></Col>
            </Row>
            <Row>
                <Col className="px-0 text-end"><p>Under:</p></Col>
                <Col className="px-0 text-start"><p>{low}</p></Col>
                <Col className="px-0"></Col>
                <Col className="px-0"></Col>
            </Row>
        </div>
    )
}
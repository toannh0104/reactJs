/**
 * Created by Toan_H on 8/12/2016.
 */
import React, {Component, PropTypes} from 'react';
import ReactBootStrap, {
    ButtonToolbar, Button, FormGroup, ControlLabel, FormControl, HelpBlock, Checkbox, Radio, InputGroup, Glyphicon,
    DropdownButton, MenuItem, Form, Col, Grid, Row, Image,Thumbnail, Carousel, ButtonGroup, ProgressBar, Nav, NavItem,
    Modal,Popover, Tooltip, OverlayTrigger
} from 'react-bootstrap';


class ModalBS extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="static-modal">
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>Modal title</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        One fine body...
                    </Modal.Body>

                    <Modal.Footer>
                        <Button>Close</Button>
                        <Button bsStyle="primary">Save changes</Button>
                    </Modal.Footer>

                </Modal.Dialog>
            </div>
        );
    }
}

var BasicModalBS = React.createClass({
    getInitialState() {
        return { showModal: false };
    },

    close() {
        this.setState({ showModal: false });
    },

    open() {
        this.setState({ showModal: true });
    },

    render() {
        const popover = (
            <Popover id="modal-popover" title="popover">
                very popover. such engagement
            </Popover>
        );
        const tooltip = (
            <Tooltip id="modal-tooltip">
                wow.
            </Tooltip>
        );

        return (
            <div>
                <p>Click to get the full Modal experience!</p>

                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.open}
                >
                    Launch demo modal
                </Button>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Text in a modal</h4>
                        <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>

                        <h4>Popover in a modal</h4>
                        <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>

                        <h4>Tooltips in a modal</h4>
                        <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>

                        <hr />

                        <h4>Overflowing text to show scroll behavior</h4>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                        <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
                        <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});


/**
 * You will want to include this bit of css
 *
 * .modal-container {
 *   position: relative;
 * }
 * .modal-container .modal, .modal-container .modal-backdrop {
 *   position: absolute;
 * }
 */

var ModalTrigger = React.createClass({
    getInitialState() {
        return { show: false };
    },

    render() {
        let close = () => this.setState({ show: false});

        return (
            <div className="modal-container" style={{height: 200}}>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={() => this.setState({ show: true})}
                >
                    Launch contained modal
                </Button>

                <Modal
                    show={this.state.show}
                    onHide={close}
                    container={this}
                    aria-labelledby="contained-modal-title"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});


function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

const formInstance = (
    <form>
        <Radio checked readOnly>
            Radio
        </Radio>
        <Checkbox checked readOnly>
            Checkbox
        </Checkbox>
        <Button type="submit">
            Submit
        </Button>
        <FormGroup>
            <Checkbox inline>
                1
            </Checkbox>
            {' '}
            <Checkbox inline>
                2
            </Checkbox>
            {' '}
            <Checkbox inline>
                3
            </Checkbox>

            <FormGroup>
                <Radio inline>
                    1
                </Radio>
                {' '}
                <Radio inline>
                    2
                </Radio>
                {' '}
                <Radio inline>
                    3
                </Radio>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                    <option value="select">select</option>
                    <option value="other">...</option>
                </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsSelectMultiple">
                <ControlLabel>Multiple select</ControlLabel>
                <FormControl componentClass="select" multiple>
                    <option value="select">select (multiple)</option>
                    <option value="other">...</option>
                </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
                <ControlLabel>Textarea</ControlLabel>
                <FormControl componentClass="textarea" placeholder="textarea" />
            </FormGroup>


            <FormGroup>
                <ControlLabel>Static text</ControlLabel>
                <FormControl.Static>
                    email@example.com
                </FormControl.Static>
            </FormGroup>


            <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>@</InputGroup.Addon>
                    <FormControl type="text" />
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup>
                    <FormControl type="text" />
                    <InputGroup.Addon>.00</InputGroup.Addon>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>$</InputGroup.Addon>
                    <FormControl type="text" />
                    <InputGroup.Addon>.00</InputGroup.Addon>
                </InputGroup>
            </FormGroup>

            <FormGroup>
                <InputGroup>
                    <FormControl type="text" />
                    <InputGroup.Addon>
                        <Glyphicon glyph="music" />
                    </InputGroup.Addon>
                </InputGroup>
            </FormGroup>

            <FormGroup>
                <InputGroup>
                    <InputGroup.Button>
                        <Button>Before</Button>
                    </InputGroup.Button>
                    <FormControl type="text" />
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup>
                    <FormControl type="text" />
                    <DropdownButton
                        componentClass={InputGroup.Button}
                        id="input-dropdown-addon"
                        title="Action"
                    >
                        <MenuItem key="1">Item</MenuItem>
                    </DropdownButton>
                </InputGroup>
            </FormGroup>

            <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>
                        <input type="radio" aria-label="..." />
                    </InputGroup.Addon>
                    <FormControl type="text" />
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <InputGroup>
                    <InputGroup.Addon>
                        <input type="checkbox" aria-label="..." />
                    </InputGroup.Addon>
                    <FormControl type="text" />
                </InputGroup>
            </FormGroup>

        </FormGroup>

        <FormGroup bsSize="large">
            <FormControl type="text" placeholder="Large text" />
        </FormGroup>
        <FormGroup>
            <FormControl type="text" placeholder="Normal text" />
        </FormGroup>
        <FormGroup bsSize="small">
            <FormControl type="text" placeholder="Small text" />
        </FormGroup>

        <FormGroup controlId="formValidationSuccess1" validationState="success">
            <ControlLabel>Input with success</ControlLabel>
            <FormControl type="text" />
            <HelpBlock>Help text with validation state.</HelpBlock>
        </FormGroup>

        <FormGroup controlId="formValidationWarning1" validationState="warning">
            <ControlLabel>Input with warning</ControlLabel>
            <FormControl type="text" />
        </FormGroup>

        <FormGroup controlId="formValidationError1" validationState="error">
            <ControlLabel>Input with error</ControlLabel>
            <FormControl type="text" />
        </FormGroup>

        <FormGroup controlId="formValidationSuccess2" validationState="success">
            <ControlLabel>Input with success and feedback icon</ControlLabel>
            <FormControl type="text" />
            <FormControl.Feedback />
        </FormGroup>

        <FormGroup controlId="formValidationWarning2" validationState="warning">
            <ControlLabel>Input with warning and feedback icon</ControlLabel>
            <FormControl type="text" />
            <FormControl.Feedback />
        </FormGroup>

        <FormGroup controlId="formValidationError2" validationState="error">
            <ControlLabel>Input with error and feedback icon</ControlLabel>
            <FormControl type="text" />
            <FormControl.Feedback />
        </FormGroup>

        <FormGroup controlId="formValidationSuccess3" validationState="success">
            <ControlLabel>Input with success and custom feedback icon</ControlLabel>
            <FormControl type="text" />
            <FormControl.Feedback>
                <Glyphicon glyph="music" />
            </FormControl.Feedback>
        </FormGroup>

        <FormGroup controlId="formValidationWarning3" validationState="warning">
            <ControlLabel>Input group with warning</ControlLabel>
            <InputGroup>
                <InputGroup.Addon>@</InputGroup.Addon>
                <FormControl type="text" />
            </InputGroup>
            <FormControl.Feedback />
        </FormGroup>

        <Form componentClass="fieldset" horizontal>
            <FormGroup controlId="formValidationError3" validationState="error">
                <Col componentClass={ControlLabel} xs={3}>
                    Input with error
                </Col>
                <Col xs={9}>
                    <FormControl type="text" />
                    <FormControl.Feedback />
                </Col>
            </FormGroup>

            <FormGroup controlId="formValidationSuccess4" validationState="success">
                <Col componentClass={ControlLabel} xs={3}>
                    Input group with success
                </Col>
                <Col xs={9}>
                    <InputGroup>
                        <InputGroup.Addon>@</InputGroup.Addon>
                        <FormControl type="text" />
                    </InputGroup>
                    <FormControl.Feedback />
                </Col>
            </FormGroup>
        </Form>

        <Form componentClass="fieldset" inline>
            <FormGroup controlId="formValidationWarning4" validationState="warning">
                <ControlLabel>Input with warning</ControlLabel>
                {' '}
                <FormControl type="text" />
                <FormControl.Feedback />
            </FormGroup>
            {' '}
            <FormGroup controlId="formValidationError4" validationState="error">
                <ControlLabel>Input group with error</ControlLabel>
                {' '}
                <InputGroup>
                    <InputGroup.Addon>@</InputGroup.Addon>
                    <FormControl type="text" />
                </InputGroup>
                <FormControl.Feedback />
            </FormGroup>
        </Form>

        <Checkbox validationState="success">
            Checkbox with success
        </Checkbox>
        <Radio validationState="warning">
            Radio with warning
        </Radio>
        <Checkbox validationState="error">
            Checkbox with error
        </Checkbox>

        {/* This requires React 15's <span>-less spaces to be exactly correct. */}
        <FormGroup validationState="success">
            <Checkbox inline>
                Checkbox
            </Checkbox>
            {' '}
            <Checkbox inline>
                with
            </Checkbox>
            {' '}
            <Checkbox inline>
                success
            </Checkbox>
        </FormGroup>

        <Grid>
            <Row>
                <Col xs={6} md={4}>
                    <Image src="/assets/thumbnail.png" rounded />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="/assets/thumbnail.png" circle />
                </Col>
                <Col xs={6} md={4}>
                    <Image src="/assets/thumbnail.png" thumbnail />
                </Col>
            </Row>
        </Grid>


        <Grid>
            <Row>
                <Col xs={6} md={4}>
                    <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
                        <h3>Thumbnail label</h3>
                        <p>Description</p>
                        <p>
                            <Button bsStyle="primary">Button</Button>&nbsp;
                            <Button bsStyle="default">Button</Button>
                        </p>
                    </Thumbnail>
                </Col>
                <Col xs={6} md={4}>
                    <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
                        <h3>Thumbnail label</h3>
                        <p>Description</p>
                        <p>
                            <Button bsStyle="primary">Button</Button>&nbsp;
                            <Button bsStyle="default">Button</Button>
                        </p>
                    </Thumbnail>
                </Col>
                <Col xs={6} md={4}>
                    <Thumbnail src="/assets/thumbnaildiv.png" alt="242x200">
                        <h3>Thumbnail label</h3>
                        <p>Description</p>
                        <p>
                            <Button bsStyle="primary">Button</Button>&nbsp;
                            <Button bsStyle="default">Button</Button>
                        </p>
                    </Thumbnail>
                </Col>
            </Row>
        </Grid>


        <Carousel>
            <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
                <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
                <Carousel.Caption>
                    <h3>Second slide label</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img width={900} height={500} alt="900x500" src="/assets/carousel.png"/>
                <Carousel.Caption>
                    <h3>Third slide label</h3>
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>

        <ButtonToolbar>
            <ButtonGroup>
                <Button><Glyphicon glyph="align-left" /></Button>
                <Button><Glyphicon glyph="align-center" /></Button>
                <Button><Glyphicon glyph="align-right" /></Button>
                <Button><Glyphicon glyph="align-justify" /></Button>
            </ButtonGroup>
        </ButtonToolbar>
        <ButtonToolbar>
            <ButtonGroup>
                <Button bsSize="large"><Glyphicon glyph="star" /> Star</Button>
                <Button><Glyphicon glyph="star" /> Star</Button>
                <Button bsSize="small"><Glyphicon glyph="star" /> Star</Button>
                <Button bsSize="xsmall"><Glyphicon glyph="star" /> Star</Button>
            </ButtonGroup>
        </ButtonToolbar>

        <ProgressBar striped bsStyle="success" now={40} />
        <ProgressBar striped bsStyle="info" now={20} />
        <ProgressBar striped bsStyle="warning" now={60} />
        <ProgressBar striped bsStyle="danger" now={80} />

        <ProgressBar active now={45} />

        <ProgressBar>
            <ProgressBar striped bsStyle="success" now={35} key={1} />
            <ProgressBar bsStyle="warning" now={20} key={2} />
            <ProgressBar active bsStyle="danger" now={10} key={3} />
        </ProgressBar>

        <Grid>
            <Row className="show-grid">
                <Col xs={12} md={8}><code>&lt;{'Col xs={12} md={8}'} /&gt;</code></Col>
                <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
            </Row>

            <Row className="show-grid">
                <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
                <Col xs={6} md={4}><code>&lt;{'Col xs={6} md={4}'} /&gt;</code></Col>
                <Col xsHidden md={4}><code>&lt;{'Col xsHidden md={4}'} /&gt;</code></Col>
            </Row>

            <Row className="show-grid">
                <Col xs={6} xsOffset={6}><code>&lt;{'Col xs={6} xsOffset={6}'} /&gt;</code></Col>
            </Row>

            <Row className="show-grid">
                <Col md={6} mdPush={6}><code>&lt;{'Col md={6} mdPush={6}'} /&gt;</code></Col>
                <Col md={6} mdPull={6}><code>&lt;{'Col md={6} mdPull={6}'} /&gt;</code></Col>
            </Row>
        </Grid>

        <Nav bsStyle="pills" activeKey={1} onSelect={handleSelect}>
            <NavItem eventKey={1} href="/home">NavItem 1 content</NavItem>
            <NavItem eventKey={2} title="Item">NavItem 2 content</NavItem>
            <NavItem eventKey={3} disabled>NavItem 3 content</NavItem>
        </Nav>

        {/*<ModalBS />*/}

        <BasicModalBS />
        <hr/>

        <ModalTrigger/>
    </form>
);

function handleSelect(selectedKey) {
    alert('selected ' + selectedKey);
}

class DemoButton extends Component {
    render() {
        return (
            formInstance
        );
    }
}

export default DemoButton;
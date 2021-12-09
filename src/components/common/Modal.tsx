import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '@/reducers/popupReducer';
import { Button, Modal } from 'react-bootstrap';
import { State } from '@/reducers';

const GlobalModal: FC = () => {
    const modal = useSelector( ( state: State ) => state.popup.modal );
    const dispatch = useDispatch();
    let renderTarget = <></>;

    if ( modal ) {
        const { modalProps, header, body, exButton, useFooter } = modal;
        const mProps = modalProps || {};
        const useFt = useFooter === undefined ? true : useFooter;

        const onHide = () => {
            dispatch( closeModal() );
        }

        renderTarget = (
            <Modal
                show={modal}
                onHide={onHide}
                size="lg"
                centered
                {...mProps}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {header}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>
                {useFt &&
                    <Modal.Footer>
                        {exButton}
                        <Button variant="dark" onClick={onHide}>Cancel</Button>
                    </Modal.Footer>
                }
            </Modal>
        );
    }

    useEffect( () => {
        return () => {
            if ( modal && modal.clearEffect ) modal.clearEffect();
        }
    }, [] );

    return renderTarget;
}

export default GlobalModal;

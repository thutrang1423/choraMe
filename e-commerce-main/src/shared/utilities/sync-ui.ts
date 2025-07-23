import { createConfirmationCreater, createMountPoint, createReactTreeMounter } from 'react-confirm';
import confirmDialog from '../components/confirm-dialog';


const mounter = createReactTreeMounter();
export const MountPoint = createMountPoint(mounter);

const creator = createConfirmationCreater(mounter);

export const confirmMes = creator(confirmDialog);

import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {UtilisateurDto} from '../utilisateur/Utilisateur.model';
import {NotificationDto} from './Notification.model';

export class NotificationDetailDto extends BaseDto{

    public utilisateur: UtilisateurDto ;
    public notification: NotificationDto ;
    

    constructor() {
        super();


        }

}

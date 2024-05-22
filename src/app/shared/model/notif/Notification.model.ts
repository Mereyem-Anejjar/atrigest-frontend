import {BaseDto} from 'src/app/zynerator/dto/BaseDto.model';

import {NotificationDetailDto} from './NotificationDetail.model';

export class NotificationDto extends BaseDto{

    public contenue: string;

   public dateEnvoi: Date;

     public notificationDetails: Array<NotificationDetailDto>;
    

    constructor() {
        super();

        this.contenue = '';
        this.dateEnvoi = null;
        this.notificationDetails = new Array<NotificationDetailDto>();

        }

}

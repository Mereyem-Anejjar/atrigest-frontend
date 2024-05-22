import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {NotificationDetailCriteria} from './NotificationDetailCriteria.model';

export class NotificationCriteria  extends BaseCriteria  {

    public id: number;
    public contenue: string;
    public contenueLike: string;
    public dateEnvoi: Date;
    public dateEnvoiFrom: Date;
    public dateEnvoiTo: Date;
      public notificationDetails: Array<NotificationDetailCriteria>;

}

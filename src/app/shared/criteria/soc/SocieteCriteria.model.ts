import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';
import {TypeSocieteCriteria} from './TypeSocieteCriteria.model';
import {AssocieCriteria} from './AssocieCriteria.model';

export class SocieteCriteria  extends BaseCriteria  {

    public id: number;
    public nom: string;
    public nomLike: string;
    public dateCreation: Date;
    public dateCreationFrom: Date;
    public dateCreationTo: Date;
    public rc: string;
    public rcLike: string;
    public taxeProfessionnelle: string;
    public taxeProfessionnelleLike: string;
    public ice: string;
    public iceLike: string;
    public gerant: string;
    public gerantLike: string;
      public associes: Array<AssocieCriteria>;

}

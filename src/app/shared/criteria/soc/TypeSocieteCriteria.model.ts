import {BaseCriteria} from 'src/app/zynerator/criteria/BaseCriteria.model';

export class TypeSocieteCriteria  extends BaseCriteria  {

    public id: number;
    public code: string;
    public codeLike: string;
    public libelle: string;
    public libelleLike: string;

}

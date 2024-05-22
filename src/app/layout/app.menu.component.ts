import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {RoleService} from "../zynerator/security/shared/service/Role.service";
import {AppComponent} from "../app.component";
import {AuthService} from "../zynerator/security/shared/service/Auth.service";
import {Router} from "@angular/router";
import {AppLayoutComponent} from "./app.layout.component";

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  model: any[];
  modelanonymous: any[];
    modelAdmin: any[];
constructor(public layoutService: LayoutService, public app: AppComponent, public appMain: AppLayoutComponent, private roleService: RoleService, private authService: AuthService, private router: Router) { }
  ngOnInit() {
    this.modelAdmin =
      [

				{
                    label: 'Pages',
                    icon: 'pi pi-fw pi-briefcase',
                    items: [
					  {
						label: 'Config',
						icon: 'pi pi-wallet',
						items: [
								  {
									label: 'Liste type identite',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/commun/type-identite/list']
								  },
								  {
									label: 'Liste priorite',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/commun/priorite/list']
								  },
								  {
									label: 'Liste banque',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/commun/banque/list']
								  },
								  {
									label: 'Liste etat avancement',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/commun/etat-avancement/list']
								  },
								  {
									label: 'Liste nationalite',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/commun/nationalite/list']
								  },
						]
					  },
					  {
						label: 'Societe',
						icon: 'pi pi-wallet',
						items: [
								  {
									label: 'Liste societe',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/soc/societe/list']
								  },
								  {
									label: 'Liste role associe',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/soc/role-associe/list']
								  },
								  {
									label: 'Liste associe',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/soc/associe/list']
								  },
								  {
									label: 'Liste type societe',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/soc/type-societe/list']
								  },
						]
					  },
					  {
						label: 'Dossier Client',
						icon: 'pi pi-wallet',
						items: [
								  {
									label: 'Liste dossier client',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/dc/dossier-client/list']
								  },
						]
					  },
					  {
						label: 'Utilisateur',
						icon: 'pi pi-wallet',
						items: [
								  {
									label: 'Liste utilisateur',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/utilisateur/utilisateur/list']
								  },
						]
					  },
					  {
						label: 'Entite',
						icon: 'pi pi-wallet',
						items: [
								  {
									label: 'Liste type entite externe',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/entite/type-entite-externe/list']
								  },
								  {
									label: 'Liste entite externe',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/entite/entite-externe/list']
								  },
						]
					  },
					  {
						label: 'Tache',
						icon: 'pi pi-wallet',
						items: [
								  {
									label: 'Liste tache detail',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/task/tache-detail/list']
								  },
								  {
									label: 'Liste tache',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/task/tache/list']
								  },
						]
					  },
					  {
						label: 'Notification',
						icon: 'pi pi-wallet',
						items: [
								  {
									label: 'Liste notification',
									icon: 'pi pi-fw pi-plus-circle',
									routerLink: ['/app/admin/notif/notification/list']
								  },
						]
					  },

				   {
					  label: 'Security Management',
					  icon: 'pi pi-wallet',
					  items: [
						  {
							  label: 'List User',
							  icon: 'pi pi-fw pi-plus-circle',
							  routerLink: ['/app/admin/security/user/list']
						  },
						  {
							  label: 'List Model',
							  icon: 'pi pi-fw pi-plus-circle',
							  routerLink: ['/app/admin/security/model-permission/list']
						  },
						  {
							  label: 'List Action Permission',
							  icon: 'pi pi-fw pi-plus-circle',
							  routerLink: ['/app/admin/security/action-permission/list']
						  },
					  ]
				  }
			]
	    }
    ];

        if (this.authService.authenticated) {
            if (this.authService.authenticatedUser.roleUsers) {
              this.authService.authenticatedUser.roleUsers.forEach(role => {
                  const roleName: string = this.getRole(role.role.authority);
                  this.roleService._role.next(roleName.toUpperCase());
                  eval('this.model = this.model' + this.getRole(role.role.authority));
              })
            }
        }
  }

    getRole(text){
        const [role, ...rest] = text.split('_');
        return this.upperCaseFirstLetter(rest.join(''));
    }

    upperCaseFirstLetter(word: string) {
      if (!word) { return word; }
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }

    onMenuClick(event) {
        this.appMain.onMenuClick(event);
    }
}

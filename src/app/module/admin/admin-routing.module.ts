
// const root = environment.rootAppUrl;

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AuthGuard} from 'src/app/zynerator/security/guards/auth.guard';

import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

@NgModule({
    imports: [
        RouterModule.forChild(
            [
                {
                    path: '',
                    children: [
                        {
                            path: 'login',
                            children: [
                                {
                                    path: '',
                                    component: LoginAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {
                            path: 'register',
                            children: [
                                {
                                    path: '',
                                    component: RegisterAdminComponent ,
                                    canActivate: [AuthGuard]
                                }
                              ]
                        },
                        {
                            path: 'task',
                            loadChildren: () => import('./view/task/task-admin-routing.module').then(x => x.TaskAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'entite',
                            loadChildren: () => import('./view/entite/entite-admin-routing.module').then(x => x.EntiteAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'utilisateur',
                            loadChildren: () => import('./view/utilisateur/utilisateur-admin-routing.module').then(x => x.UtilisateurAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'soc',
                            loadChildren: () => import('./view/soc/soc-admin-routing.module').then(x => x.SocAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'commun',
                            loadChildren: () => import('./view/commun/commun-admin-routing.module').then(x => x.CommunAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'notif',
                            loadChildren: () => import('./view/notif/notif-admin-routing.module').then(x => x.NotifAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'dc',
                            loadChildren: () => import('./view/dc/dc-admin-routing.module').then(x => x.DcAdminRoutingModule),
                            canActivate: [AuthGuard],
                        },
                        {
                            path: 'security',
                            loadChildren: () => import('../security/security-routing.module').then(x => x.SecurityRoutingModule),
                            canActivate: [AuthGuard],
                        }
                    ]
                },
            ]
        ),
    ],
    exports: [RouterModule],
})
export class AdminRoutingModule { }

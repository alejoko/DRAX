import { Ability, AbilityBuilder } from '@casl/ability';

import { UserInfo } from '../services/auth/_auth.type';



const ability = new Ability();
export function updateAbilitiesFor(user?: UserInfo) {
    const { can, rules } = new AbilityBuilder();

    if (user) {
        can('has', 'login');

        // if (user.profile.roles.indexOf(Roles.Client) !== -1) {
        //     can('view', 'patients');
        //     can('add', 'patient');
        //     can('edit', 'patient');
            
        //     can('do', 'questionnaire');
        //     can('select', 'questionnaires');
        // }
        // if (user.profile.roles.indexOf(Roles.Provider) !== -1) {
        //     can('view', 'clients');
        //     can('edit', 'client');
        //     can('add', 'client');

        //     can('view', 'patients');
        //     can('add', 'patient');
        //     can('edit', 'patient');

        //     can('assign', 'questionnaire');
        // }
    } else {
        can('has', 'logout');
    }
    // can read blog posts
    // can('read', 'BlogPost');
    
    // if (user) {
    //     // can manage (i.e., do anything) own posts
    //     can('manage', 'BlogPost', { author: user.profile.email });
    // }
    // cannot delete a post if it was created more than a day ago
    // cannot('delete', 'BlogPost', {
    //     createdAt: { $lt: Date.now() - 24 * 60 * 60 * 1000 }
    // });

    ability.update(rules as any);
};


export default ability;

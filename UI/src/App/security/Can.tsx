import { createContext, Context } from 'react';
import { createContextualCan } from '@casl/react';

import { AnyAbility } from '@casl/ability';

export const AbilityContext: Context<AnyAbility> = createContext<AnyAbility>(undefined as any);
export const Can = createContextualCan(AbilityContext.Consumer);

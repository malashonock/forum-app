import { RequestHandler } from 'express';

import { ThreadFields } from '@shared/types';
import {
  ValidationService,
  FormValidationSchema,
  isRequired,
  isNotLongerThan,
  isNotShorterThan,
} from '@shared/validation';

export const validateThreadFields: RequestHandler = (req, res, next) => {
  const validationResult = ValidationService.runValidators(
    req.body as ThreadFields,
    {
      title: [isRequired, isNotShorterThan(5), isNotLongerThan(150)],
      body: [isRequired, isNotShorterThan(10), isNotLongerThan(2500)],
    } as FormValidationSchema<ThreadFields>,
  );

  if (validationResult.errors) {
    res.status(400).send(validationResult.errors);
  } else {
    next();
  }
};

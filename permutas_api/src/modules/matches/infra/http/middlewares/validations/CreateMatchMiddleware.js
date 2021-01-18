import * as Yup from 'yup';

import AppError from '../../../../../../shared/errors/AppError';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    interest_1: Yup.string().required(),
    interest_2: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    throw new AppError('validation fail');
  }

  return next();
};

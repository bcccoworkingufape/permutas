import * as Yup from 'yup';

import AppError from '../../../../../../shared/errors/AppError';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .required()
      .min(6),
  });

  if (!(await schema.isValid(req.body))) {
    throw new AppError('validation fail');
  }

  return next();
};

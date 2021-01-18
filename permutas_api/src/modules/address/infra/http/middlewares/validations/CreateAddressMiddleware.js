import * as Yup from 'yup';

import AppError from '../../../../../../shared/errors/AppError';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    region: Yup.string().notRequired(),
    state: Yup.string().required(),
    city: Yup.string().required(),
    neighborhood: Yup.string().notRequired(),
  });

  if (!(await schema.isValid(req.body))) {
    throw new AppError('validation fail');
  }

  return next();
};

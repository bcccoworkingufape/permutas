import * as Yup from 'yup';

import AppError from '../../../../../../shared/errors/AppError';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    position: Yup.string().required(),
    institution: Yup.string().required(),
    role: Yup.string().required(),
    allocation: Yup.string().required(),
    state: Yup.string().required(),
    city: Yup.string().required(),
  });

  if (!(await schema.isValid(req.body))) {
    throw new AppError('validation fail');
  }

  return next();
};

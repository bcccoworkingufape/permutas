import * as Yup from 'yup';

import AppError from '../../../../../../shared/errors/AppError';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    acronym: Yup.string().required(),
    campus: Yup.string(),
  });

  if (!(await schema.isValid(req.body))) {
    throw new AppError('validation fail');
  }

  return next();
};

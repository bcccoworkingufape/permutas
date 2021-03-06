import * as Yup from 'yup';

import AppError from '../../../../../../shared/errors/AppError';

export default async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string()
      .notRequired()
      .max(120),
    page: Yup.number()
      .notRequired()
      .integer()
      .positive(),
  });

  if (!(await schema.isValid(req.query))) {
    throw new AppError('validation fail');
  }

  return next();
};

/* eslint-disable @typescript-eslint/no-unused-vars */


interface Form {
    stars?: number;
    comment?: string;
    user?: string | undefined;
    office?: string;
  }
  
  const Validation = (form: Form): { [key: string]: string } => {
    const errors: { [key: string]: string } = {};
  
    if (!form.stars) {
      errors.stars = "⚠️Select at least one⚠️";
    }
    if (!form.comment) {
      errors.comment = 'Please write a Review';
    } else if (form.comment.length < 2 || form.comment.length > 25) {
      errors.comment = "⚠️Write a comment that is at least 2 characters long and 25 characters max⚠️.";
    }
    if (!form.office) {
        errors.office = "⚠️Select at least one⚠️";
      }
    if (!form.stars || !form.comment || form.comment.length < 2 || form.comment.length > 25 || !form.office) {
      errors.boton = "⚠️Form incomplete⚠️";
    }
  
    return errors;
  };
  
  export default Validation;
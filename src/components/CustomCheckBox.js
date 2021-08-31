import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
const CustomCheckbox = withStyles({
    root: {
      color: "#009688",
      '&$checked': {
        color: "#00695f",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  export default CustomCheckbox;
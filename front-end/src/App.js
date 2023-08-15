import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CssBaseline,
  Grid,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  Avatar,
  TableBody,
  TextField,
  TableHead,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormGroup,
  Checkbox,
  Stack,
  Input,
  Button,
  Alert,
} from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  useGetResumeProfileQuery,
  useSaveProfileMutation,
} from "./services/candidateProfileAPI";
import styled from "@emotion/styled";
import { format } from "date-fns";

function App() {
  // Style
  const Input = styled("input")({
    display: "none",
  });
  // states
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [dob, setDob] = useState(null);
  const [st, setSt] = useState("");
  const [gender, setGender] = useState();
  const [pjl, setPjl] = useState([]);
  const [pimage, setPimage] = useState("");
  const [rdoc, setRdoc] = useState("");
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });
  const [candidates, setCandidates] = useState([]);

  // RTK Query
  const [saveProfile] = useSaveProfileMutation();
  const { data, isSuccess } = useGetResumeProfileQuery();
  console.log(data);

  // useEffect
  useEffect(() => {
    if (data && isSuccess) {
      setCandidates(data.candidates);
    }
  }, [data, isSuccess]);

  // MultiCheck Box
  const getPjl = (e) => {
    let data = pjl;
    data.push(e.target.value);
    setPjl(data);
  };

  //handle form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // console.log(data);
    data.append("name", name);
    data.append("email", email);
    data.append("dob", dob);
    data.append("st", st);
    data.append("gender", gender);
    data.append("pjl", pjl);
    data.append("pimage", pimage);
    data.append("rdoc", rdoc);

    if (name && email) {
      const res = await saveProfile(data);
      console.log(res);
      if (res?.data?.status === "success") {
        setError({
          status: true,
          msg: "Resume Uploaded Successfully",
          type: "success",
        });
        resetForm();
      }
      if (res?.data?.status === "failed") {
        setError({
          status: true,
          msg: res.data.message,
          type: "success",
        });
        resetForm();
      }
    } else {
      setError({
        status: true,
        msg: "All Feils Are Required",
        type: "error",
      });
    }
  };

  // Clear Form
  const resetForm = () => {
    setName("");
    setEmail("");
    setDob(null);
    setSt("");
    setGender("");
    setPjl([]);
    setPimage("");
    setRdoc("");
    document.getElementById("resume-form").reset();
  };

  return (
    <>
      <CssBaseline />
      <Box
        display={"flex"}
        component={"div"}
        fullWidth
        justifyContent={"center"}
        sx={{ backgroundColor: "error.light", p: 2, m: 0 }}
      >
        <Typography
          variant="h2"
          component={"div"}
          sx={{ fontWeight: "bold", color: "white" }}
        >
          Resume Uploader
        </Typography>
      </Box>
      <Grid container justifyContent={"center"}>
        <Grid item xs={8}>
          <Box
            component="form"
            sx={{
              p: 3,
            }}
            id="resume-form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <TextField
              id="name"
              name="name"
              required
              fullWidth
              margin="normal"
              label="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <TextField
              id="email"
              name="email"
              required
              fullWidth
              margin="normal"
              label="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Box>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Date Of Birth"
                    value={dob}
                    onChange={(newValue) => {
                      setDob(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="state-select-lable">State</InputLabel>
              <Select
                labelId="state-select-lable"
                id="state-select"
                value={st}
                label="state"
                onChange={(e) => {
                  setSt(e.target.value);
                }}
              >
                <MenuItem value="Lahore">Lahore</MenuItem>
                <MenuItem value="Karach">Karach</MenuItem>
                <MenuItem value="Islamabad">Islamabad</MenuItem>
              </Select>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <FormLabel id="gender-radio">Gender</FormLabel>
              <RadioGroup row name="gender">
                <FormControlLabel
                  value={"male"}
                  control={<Radio />}
                  label="Male"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
                <FormControlLabel
                  value={"female"}
                  control={<Radio />}
                  label="Female"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
                <FormControlLabel
                  value={"other"}
                  control={<Radio />}
                  label="Other"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                />
              </RadioGroup>
            </FormControl>
            <FormControl margin="normal" component={"fieldset"} fullWidth>
              <FormLabel component={"legend"}>Preferred Job Location</FormLabel>
              <FormGroup row>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Lahore"
                  value={"Lahore"}
                  onChange={getPjl}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Karachi"
                  value={"Karachi"}
                  onChange={getPjl}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Islamabad"
                  value={"Islamabad"}
                  onChange={getPjl}
                />
              </FormGroup>
            </FormControl>
            <Stack direction={"row"} alignItems={"center"} spacing={4}>
              <label htmlFor="profile-photo">
                <Input
                  accept="image/*"
                  id="profile-photo"
                  type="file"
                  onChange={(e) => setPimage(e.target.files[0])}
                />
                <Button variant="contained" component="span">
                  Upload Photo
                </Button>
              </label>
              <label htmlFor="resume-file">
                <Input
                  accept="doc/*"
                  id="resume-file"
                  type="file"
                  onChange={(e) => setRdoc(e.target.files[0])}
                />
                <Button variant="contained" component="span">
                  Upload File
                </Button>
              </label>
            </Stack>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, px: 5 }}
              color="error"
            >
              Submit
            </Button>
          </Box>
          {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ""}
        </Grid>
        <Grid item xs={8} margin={"normal"} sx={{ mt: 3, mb: 5 }}>
          <Box
            display={"flex"}
            component={"div"}
            fullWidth
            justifyContent={"center"}
            sx={{ backgroundColor: "info.light", p: 2, m: 0 }}
          >
            <Typography
              variant="h5"
              component={"div"}
              sx={{ fontWeight: "bold", color: "white" }}
            >
              List Of Candidates
            </Typography>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple-table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">DOB</TableCell>
                  <TableCell align="center">State</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Avatar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {candidates?.map((candidate, i) => {
                  return (
                    <TableRow
                      key={i}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {candidate.name}
                      </TableCell>
                      <TableCell align="center">{candidate.email}</TableCell>
                      <TableCell align="center">
                        {format(new Date(candidate.dob), "dd-MM-yyy")}
                      </TableCell>
                      <TableCell align="center">{candidate.state}</TableCell>
                      <TableCell align="center">{candidate.gender}</TableCell>
                      <TableCell align="center">{candidate.location}</TableCell>
                      <TableCell align="center">
                        <Avatar
                          alt="Abdullah"
                          src={`http://127.0.0.1:8000/${candidate.pimage}`}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}

export default App;

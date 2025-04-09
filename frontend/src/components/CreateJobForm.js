import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from "@mui/material";

// --- 1) VALIDATION SCHEMA ---
const schema = yup.object().shape({
  // Left column fields
  title: yup.string().required("Job Title is required"),
  companyName: yup.string().required("Company Overview is required"),
  location: yup.string().required("Location is required"),
  jobTypes: yup.array().min(1, "Select at least one job type"),
  payRate: yup
    .number()
    .typeError("Pay Rate must be a number")
    .required("Pay Rate is required"),
  description: yup.string().required("Description is required"),

  // Right column fields
  requirements: yup.string().required("Requirements is required"),
  responsibilities: yup.string().required("Responsibilities is required"),
  benefits: yup.string().required("Benefits is required"),
});

// --- 2) MAIN COMPONENT ---
const CreateJobForm = () => {
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // React Hook Form + Yup
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const formValues = watch();
  const jobTypesValue = formValues.jobTypes || [];

  // Dialog open/close
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // --- 3) FORM SUBMISSION ---
  const handleFormSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/jobs", formValues);
      setMessage(response.data.message || "Job posted successfully!");
      setSubmitSuccess(true);
      reset(); // clear form
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      handleCloseDialog();
    }
  };

  const handleNewJob = () => {
    setSubmitSuccess(false);
    setMessage("");
  };

  // --- 4) RENDER ---
  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        mt: 4,
        p: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}
    >
      {submitSuccess ? (
        <Box textAlign="center">
          <Typography variant="h5" gutterBottom color="success.main">
            Job Posted Successfully!
          </Typography>
          <Button variant="contained" onClick={handleNewJob} sx={{ mt: 2 }}>
            Post New Job
          </Button>
        </Box>
      ) : (
        <>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Job Posting Form
          </Typography>

          {/* --- FORM --- */}
          <form onSubmit={handleSubmit(handleOpenDialog)}>
            <Grid container spacing={3}>
              {/* ------ LEFT COLUMN ------ */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Job Title"
                  fullWidth
                  {...register("title")}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Company Name"
                  fullWidth
                  {...register("companyName")}
                  error={!!errors.companyName}
                  helperText={errors.companyName?.message}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Location"
                  fullWidth
                  {...register("location")}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  sx={{ mb: 2 }}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel
                    shrink={jobTypesValue.length > 0}
                    sx={{ backgroundColor: "#F4F4F4", px: 1 }}
                  >
                    Job Type
                  </InputLabel>
                  <Controller
                    name="jobTypes"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <Select
                        {...field}
                        multiple
                        value={field.value || []}
                        renderValue={(selected) => (
                          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                      >
                        {/* Options for "Job Type" */}
                        {["Part Time", "Full Time", "Contract", "Seasonal"].map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  {errors.jobTypes && (
                    <Typography variant="caption" color="error">
                      {errors.jobTypes.message}
                    </Typography>
                  )}
                </FormControl>

                <TextField
                  label="Pay Rate"
                  fullWidth
                  {...register("payRate")}
                  error={!!errors.payRate}
                  helperText={errors.payRate?.message}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  {...register("description")}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              </Grid>

              {/* ------ RIGHT COLUMN ------ */}
              <Grid item xs={12} md={6}>
                <TextField
                  label="Requirements"
                  fullWidth
                  multiline
                  rows={4}
                  {...register("requirements")}
                  error={!!errors.requirements}
                  helperText={errors.requirements?.message}
                  sx={{ mb: 3 }}
                />

                <TextField
                  label="Responsibilities"
                  fullWidth
                  multiline
                  rows={4}
                  {...register("responsibilities")}
                  error={!!errors.responsibilities}
                  helperText={errors.responsibilities?.message}
                  sx={{ mb: 3 }}
                />

                <TextField
                  label="Benefits"
                  fullWidth
                  multiline
                  rows={4}
                  {...register("benefits")}
                  error={!!errors.benefits}
                  helperText={errors.benefits?.message}
                />
              </Grid>
            </Grid>

            {/* --- Centered Submit Button --- */}
            <Button
              type="submit"
              variant="contained"
              sx={{ 
                mt: 3,
                display: "block",
                mx: "auto" // Centers horizontally
              }}
            >
              Create Job Posting
            </Button>
          </form>

          {/* --- CONFIRMATION DIALOG --- */}
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Confirm Job Posting</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please review your job details before submitting:
              </DialogContentText>
              <Box sx={{ mt: 2 }}>
                <Typography>
                  <strong>Title:</strong> {formValues.title}
                </Typography>
                <Typography>
                  <strong>Company Overview:</strong>{" "}
                  {formValues.companyName?.substring(0, 100)}...
                </Typography>
                <Typography>
                  <strong>Location:</strong> {formValues.location}
                </Typography>
                <Typography>
                  <strong>Job Type:</strong> {formValues.jobTypes?.join(", ")}
                </Typography>
                <Typography>
                  <strong>Pay Rate:</strong> {formValues.payRate}
                </Typography>
                <Typography>
                  <strong>Description:</strong>{" "}
                  {formValues.description?.substring(0, 100)}...
                </Typography>
                <Typography>
                  <strong>Requirements:</strong>{" "}
                  {formValues.requirements?.substring(0, 100)}...
                </Typography>
                <Typography>
                  <strong>Responsibilities:</strong>{" "}
                  {formValues.responsibilities?.substring(0, 100)}...
                </Typography>
                <Typography>
                  <strong>Benefits:</strong>{" "}
                  {formValues.benefits?.substring(0, 100)}...
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleFormSubmit} variant="contained" color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>

          {/* --- SERVER RESPONSE MESSAGE --- */}
          {message && (
            <Typography
              color={message.includes("error") ? "error" : "success"}
              sx={{ mt: 2 }}
            >
              {message}
            </Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default CreateJobForm;

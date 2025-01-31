# Use a Python base image
FROM python:3.10-slim

# Set working directory in the container to the inner backend folder
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files, including the apps (courses_app, main_app, etc.)
COPY . .

# Expose the port that Gunicorn will use (default 8000)
EXPOSE 8000

# Run Gunicorn instead of the Django development server
CMD ["gunicorn", "your_project_name.wsgi:application", "--bind", "0.0.0.0:8000"]

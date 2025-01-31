# Use a Python base image
FROM python:3.10-slim

# Set working directory in the container to the inner backend folder
WORKDIR /app

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all project files, including the apps (courses_app, main_app, etc.)
COPY . .

# Expose Django port
EXPOSE 8000

# Run the Django development server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

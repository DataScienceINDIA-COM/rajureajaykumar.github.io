import ast
import os

class CodeBaseAnalyzer:
    def __init__(self, read_file_func=None, list_project_files_func=None):
        self.read_file_func = read_file_func
        self.list_project_files_func = list_project_files_func

    def get_project_files(self):
        if self.list_project_files_func is None:
            raise ValueError("list_project_files_func is not defined")
        return self.list_project_files_func()

    def detect_file_type(self, file_path):
        file_name, file_extension = os.path.splitext(file_path)
        return file_extension.lower()

    def detect_file_language(self, file_path):
        file_type = self.detect_file_type(file_path)
        if file_type == ".py":
            return "python"
        elif file_type == ".js":
            return "javascript"
        else:
            return "unknown"

    def analyze_file(self, file_path):
        if self.read_file_func is None:
            raise ValueError("read_file_func is not defined")
        try:
            file_content = self.read_file_func(file_path)
            if file_content is None or file_content["status"] == "failed":
                raise ValueError(f"Failed to read file: {file_path}")
            tree = ast.parse(file_content["result"])
        except (FileNotFoundError, SyntaxError, UnicodeDecodeError, ValueError) as e:
            print(f"Error analyzing file {file_path}: {e}")
            return None

        classes = []
        functions = []
        imports = []

        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                class_data = {"name": node.name, "methods": []}
                for sub_node in ast.walk(node):
                    if isinstance(sub_node, ast.FunctionDef):
                        class_data["methods"].append(sub_node.name)
                classes.append(class_data)
            elif isinstance(node, ast.FunctionDef):
                functions.append(node.name)
            elif isinstance(node, ast.Import):
                for alias in node.names:
                    imports.append(alias.name)
            elif isinstance(node, ast.ImportFrom):
                imports.append(node.module)

        return {
            "file_path": file_path,
            "classes": classes,
            "functions": functions,
            "imports": imports,
        }

    def analyze_file_js(self, file_path):
        file_type = self.detect_file_type(file_path)
        if file_type != ".js":
            return None
        if self.read_file_func is None:
            raise ValueError("read_file_func is not defined")
        try:
            file_content = self.read_file_func(file_path)
            if file_content is None or file_content["status"] == "failed":
                raise ValueError(f"Failed to read file: {file_path}")
            content = file_content["result"]
        except (FileNotFoundError, UnicodeDecodeError, ValueError) as e:
            print(f"Error analyzing file {file_path}: {e}")
            return None
        
        functions_js = []
        
        lines = content.splitlines()
        
        for line in lines:
            if "function" in line and "{" in line:
                parts = line.split("(")
                function_name_parts = parts[0].split(" ")
                function_name = function_name_parts[function_name_parts.index("function") + 1]
                functions_js.append(function_name)

        return {"file_path": file_path, "functions_js": functions_js}

    def analyze_codebase(self, file_paths):
        results = []
        for file_path in file_paths:
            file_type = self.detect_file_type(file_path)
            if file_type == ".py":
                result = self.analyze_file(file_path)
                if result:
                    results.append(result)
            elif file_type == ".js":
                result = self.analyze_file_js(file_path)
                if result:
                    results.append(result)
        return results

    def analyze_project(self):
        file_paths = self.get_project_files()
        
        project_data = {
                "files": [],
                "file_types": {},
                "languages": {}
            }

        for file_path in file_paths:
            file_type = self.detect_file_type(file_path)
            language = self.detect_file_language(file_path)
            
            project_data["files"].append(file_path)
            project_data["file_types"][file_path] = file_type
            project_data["languages"][file_path] = language
        
        project_data["analysis"] = self.analyze_codebase(file_paths)

        return project_data
class CodeRelationshipMapper:
    def __init__(self, code_data):
        self.code_data = code_data
        self.graph = {}

    def map_relationships(self):
        for file_data in self.code_data:
            file_path = file_data['file_path']
            self.graph[file_path] = {
                'type': 'file',
                'name': file_path,
                'related_nodes': []
            }
            #classes
            if 'classes' in file_data:
              for class_data in file_data['classes']:
                  class_name = f"{file_path}::{class_data['name']}"
                  self.graph[class_name] = {
                      'type': 'class',
                      'name': class_data['name'],
                      'related_nodes': []
                  }
                  self.graph[file_path]['related_nodes'].append(class_name)
                  #methods
                  for method_name in class_data['methods']:
                      method_identifier = f"{file_path}::{class_data['name']}::{method_name}"
                      self.graph[method_identifier] = {
                        'type':'function',
                        'name': method_name,
                        'related_nodes': []
                      }
                      self.graph[class_name]['related_nodes'].append(method_identifier)
            #functions
            if 'functions' in file_data:
              for function_name in file_data['functions']:
                  function_identifier = f"{file_path}::{function_name}"
                  self.graph[function_identifier] = {
                      'type': 'function',
                      'name': function_name,
                      'related_nodes': []
                  }
                  self.graph[file_path]['related_nodes'].append(function_identifier)
            if 'functions_js' in file_data:
              for function_name in file_data['functions_js']:
                  function_identifier = f"{file_path}::{function_name}"
                  self.graph[function_identifier] = {
                      'type': 'function',
                      'name': function_name,
                      'related_nodes': []
                  }
                  self.graph[file_path]['related_nodes'].append(function_identifier)
            #imports
            if 'imports' in file_data:
              for imported_file in file_data['imports']:
                if imported_file in self.graph:
                    self.graph[file_path]['related_nodes'].append(imported_file)
        
        return self.graph

    def print_graph(self, graph):
        for node_id, node_data in graph.items():
            print(f"Node: {node_id} ({node_data['type']})")
            for related_node in node_data['related_nodes']:
                print(f"  -> {related_node}")

    def get_file_dependencies(self, graph, file_path):
      dependencies = []
      if file_path in graph:
          for related_node in graph[file_path]['related_nodes']:
              if graph[related_node]['type'] == 'file':
                  dependencies.append(related_node)
      return dependencies
// Mock DragEvent as '@lumino/dragdrop' already requires it at require time
global.DragEvent = class DragEvent { };
